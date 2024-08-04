import { b2Vec2, b2Clamp, b2Color } from "@box2d/core";
import { createContext, useContext } from "react";

import { TestDebugDraw, ParticleParameter, Settings, DrawingParticles } from "@/app/particles";

import { createShaderProgram, glsl } from "typed-glsl";

const vertexShaderSource = glsl`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUV;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

void main() {
    vUV = uv;
    gl_Position = uPMatrix * uMVMatrix * vec4(position, 500.0, 1.0);
}
`;

const fragmentShaderSource = glsl`
precision highp float;
varying vec2 vUV;
uniform float opacity;
uniform sampler2D textureID;
uniform vec2 uvOffset;

void main() {
    gl_FragColor = texture2D(textureID, vUV + uvOffset);
    gl_FragColor.w *= opacity;
}
`;

export function createDefaultShader(gl: WebGLRenderingContext) {
    return createShaderProgram(gl, vertexShaderSource, fragmentShaderSource, {
        position: "vertexAttribPointer",
        uv: "vertexAttribPointer",
        uMVMatrix: "uniformMatrix4f",
        uPMatrix: "uniformMatrix4f",
        textureID: "uniform1i",
        opacity: "uniform1f",
        uvOffset: "uniform2f",
    });
}

export type DefaultShader = ReturnType<typeof createDefaultShader>;

export interface TextureInfo {
    width: number;
    height: number;
    texture: WebGLTexture;
}

export function initGlCanvas(canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl") as WebGLRenderingContext;
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);
    resizeGlCanvas(canvas, gl, canvas.clientWidth, canvas.clientHeight);
    return gl;
}

export function resizeGlCanvas(canvas: HTMLCanvasElement, gl: WebGLRenderingContext, width: number, height: number) {
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
}

export function clearGlCanvas(
    gl: WebGLRenderingContext,
    red: GLclampf,
    green: GLclampf,
    blue: GLclampf,
    alpha: GLclampf,
) {
    gl.clearColor(red, green, blue, alpha);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

export async function loadImages<T extends { [s: string]: string }>(gl: WebGLRenderingContext, imagesToLoad: T) {
    const textures = {} as { [key in keyof T]: TextureInfo };
    const imagePromises = Object.keys(imagesToLoad).map(
        (key) =>
            new Promise<void>((resolve) => {
                const texture = gl.createTexture() as WebGLTexture;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                // let's assume all images are not a power of 2
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

                const image = new Image();
                const textureInfo: TextureInfo = {
                    width: 0,
                    height: 0,
                    texture,
                };
                image.onload = () => {
                    textureInfo.width = image.width;
                    textureInfo.height = image.height;
                    gl.bindTexture(gl.TEXTURE_2D, texture);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
                    resolve();
                };
                image.src = imagesToLoad[key as keyof T];
                textures[key as keyof T] = textureInfo;
            }),
    );
    await Promise.all(imagePromises);
    return textures;
}

export type PromiseType<T> = T extends Promise<infer TR> ? TR : unknown;

export class TestManager {
    public readonly m_settings = new Settings();

    public m_test: DrawingParticles = null!;

    public m_lMouseDown = false;

    public m_rMouseDown = false;

    public m_max_demo_time = 1000 * 10;

    public m_ctx: CanvasRenderingContext2D | null = null;

    private m_mouse = new b2Vec2();

    private testTitle = "Unset";


    private m_hoveringCanvas = false;

    private shouldRestart = false;

    private m_keyMap: { [s: string]: boolean } = {};

    private gl: WebGLRenderingContext | null = null;

    private defaultShader: ReturnType<typeof createDefaultShader> | null = null;


    private readonly particleParameter = new ParticleParameter();

    public constructor() {
    }

    public init(
        glCanvas: HTMLCanvasElement,
        debugCanvas: HTMLCanvasElement,
        wrapper: HTMLDivElement,
    ) {
        debugCanvas.addEventListener("mousedown", (e) => this.HandleMouseDown(e));
        debugCanvas.addEventListener("mouseup", (e) => this.HandleMouseUp(e));
        debugCanvas.addEventListener("mousemove", (e) => this.HandleMouseMove(e));
        debugCanvas.addEventListener("wheel", (e) => this.HandleMouseWheel(e));
        debugCanvas.addEventListener("mouseenter", () => {
            this.m_hoveringCanvas = true;
        });
        debugCanvas.addEventListener("mouseleave", () => {
            this.m_hoveringCanvas = false;
        });

        const onResize = () => {
            const { clientWidth, clientHeight } = wrapper;
            if (debugCanvas.width !== clientWidth || debugCanvas.height !== clientHeight) {
                debugCanvas.width = glCanvas.width = clientWidth;
                debugCanvas.height = glCanvas.height = clientHeight;
                this.m_test?.camera.resize(clientWidth, clientHeight);
                // this.m_test?.Resize(clientWidth, clientHeight);
                this.gl && resizeGlCanvas(glCanvas, this.gl, clientWidth, wrapper.clientHeight);
            }
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("orientationchange", onResize);
        onResize();

        this.m_ctx = debugCanvas.getContext("2d");
        if (!this.m_ctx) throw new Error("Could not create 2d context for debug-draw");

        // disable context menu to use right-click
        window.addEventListener(
            "contextmenu",
            (e) => {
                if (e.target instanceof HTMLElement && e.target.closest("main")) {
                    e.preventDefault();
                }
            },
            true,
        );

        window.addEventListener("keydown", (e: KeyboardEvent): void => this.HandleKey(e, true));
        window.addEventListener("keyup", (e: KeyboardEvent): void => this.HandleKey(e, false));

        this.prepareGl(glCanvas);

        if (!this.gl || !this.defaultShader) return;
        this.m_test = new DrawingParticles({
            gl: this.gl,
            shader: this.defaultShader,
            particleParameter: this.particleParameter,
        });
    }

    private async prepareGl(glCanvas: HTMLCanvasElement) {
        this.gl = initGlCanvas(glCanvas);
        this.defaultShader = createDefaultShader(this.gl);
    }

    public HomeCamera(): void {
        const zoom = this.m_test ? this.m_test.GetDefaultViewZoom() : 25;
        const center = this.m_test ? this.m_test.getCenter() : b2Vec2.ZERO;
        this.m_test.camera.setPositionAndZoom(center.x, center.y, zoom);
    }

    public ZoomCamera(zoom: number): void {
        this.m_test.camera.setZoom(b2Clamp(this.m_test.camera.getZoom() * zoom, 0.5, 500));
    }

    public HandleMouseMove(e: MouseEvent): void {
        const element = new b2Vec2(e.offsetX, e.offsetY);
        const world = this.m_test.camera.unproject(element, new b2Vec2());

        this.m_mouse.Copy(element);

        this.m_test?.MouseMove(world, this.m_lMouseDown);

        if (this.m_rMouseDown) {
            const { x, y } = this.m_test.camera.getCenter();
            const f = 1 / this.m_test.camera.getZoom();
            this.m_test.camera.setPosition(x - e.movementX * f, y + e.movementY * f);
        }
    }

    public HandleMouseDown(e: MouseEvent): void {
        console.log("hello down");
        const element = new b2Vec2(e.offsetX, e.offsetY);
        const world = this.m_test.camera.unproject(element, new b2Vec2());

        switch (e.button) {
            case 0: // left mouse button
                this.m_lMouseDown = true;
                this.m_test?.MouseDown(world);
                break;
            case 2: // right mouse button
                this.m_rMouseDown = true;
                break;
        }
    }

    public HandleMouseUp(e: MouseEvent): void {
        const element = new b2Vec2(e.offsetX, e.offsetY);
        const world = this.m_test.camera.unproject(element, new b2Vec2());

        switch (e.button) {
            case 0: // left mouse button
                this.m_lMouseDown = false;
                this.m_test?.MouseUp(world);
                break;
            case 2: // right mouse button
                this.m_rMouseDown = false;
                break;
        }
    }

    public HandleMouseWheel(e: WheelEvent): void {
        if (this.m_hoveringCanvas) {
            if (e.deltaY < 0) {
                this.ZoomCamera(1.1);
            } else if (e.deltaY > 0) {
                this.ZoomCamera(1 / 1.1);
            }
            e.preventDefault();
        }
    }

    private HandleKey(e: KeyboardEvent, down: boolean): void {
        if (this.m_hoveringCanvas || !down) {
            const { key } = e;
        }
    }

    public SingleStep(): void {
        if (!this.m_settings.m_pause) {
            this.m_settings.m_pause = true;
        }
        this.m_settings.m_singleStep = true;
    }

    public scheduleRestart() {
        this.shouldRestart = true;
    }

    public SimulationLoop(): void {
        const draw = this.m_settings.m_debugDraw;

        clearGlCanvas(this.gl!, 0, 0, 0, 0);
        this.gl?.enable(this.gl.BLEND);
        this.defaultShader?.use();
        this.defaultShader?.uMVMatrix.set(false, this.m_test.camera.modelView);
        this.defaultShader?.uPMatrix.set(false, this.m_test.camera.projection);

        const center = this.m_test.camera.getCenter();
        const zoom = this.m_test.camera.getZoom();
        draw.Prepare(center.x, center.y, zoom, true);

        this.m_test?.RunStep(this.m_settings);

        draw.Finish();

        if (this.shouldRestart) {
            this.shouldRestart = false;
        }
    }
}

export const ManagerContext = createContext(new TestManager());
export const useManager = () => useContext(ManagerContext);
