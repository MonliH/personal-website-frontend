import {
  Clock,
  PerspectiveCamera,
  Scene,
  Vector3,
  OrthographicCamera,
  ShapeUtils,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  RepeatWrapping,
} from "three";
import DynamicBodyQueryCallback from "./liquidfun/DynamicBodyQueryCallback";
import { lerp } from "./../utils/lerp";
import DebugLayer from "./DebugLayer";
import LiquidParticles from "./LiquidParticles";
import Renderer from "./Renderer";
import Simulation from "./Simulation";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { LiquidShader } from "./LiquidShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
import { LayersBlendShader } from "./LayersBlendShader.js";
import Penguin from "./Penguin";

export default class Stage {
  static instance = null;

  static initialize(container, cameraMode, ref) {
    if (!Stage.instance) {
      Stage.instance = new Stage(container, cameraMode, ref);
    }
  }

  static destroy() {
    Stage.instance && Stage.instance.destroy();
  }

  static setcameraMode(mode) {
    Stage.instance && Stage.instance.setcameraMode(mode);
  }

  // settings:
  settings = {
    liquidColor: [60, 110, 240, 255],
    numberOfPenguins: 6,
    spawnAreaRadius: 4,
    debugPhysics: true,
    // debugPhysics: true,
    velocityIterations: 1,
    positionIterations: 1,
  };

  leader = {
    name: "",
    position: {
      x: 0,
      y: 0,
    },
  };

  // physics:
  simulation;
  mouseJoint;
  // three:
  renderer;
  composer;
  cameraMode = "full";
  // scenes
  sceneLiquid;
  sceneForeground;
  // meshes
  penguins = {};
  liquidParticles;
  // debug
  debugLayer;
  // utils:
  clock;
  paused;
  renderCallBack;
  svgRef;

  constructor(container, cameraMode, ref) {
    this.container = container;
    this.cameraMode = cameraMode;

    this.clock = new Clock();
    this.svgRef = ref;

    this.simulation = new Simulation(
      this.settings.numberOfPenguins,
      this.settings.spawnAreaRadius,
      this.settings.liquidColor
    );

    // set the 4th penguin as camera target to follow
    for (let body of this.simulation.world.bodies) {
      const { childName } = body;
      if (childName === "penguin-4") {
        this.targetToFollow = body;
      }
    }

    this.renderer = new Renderer();

    this.camera = new PerspectiveCamera(
      /* fov */ 70,
      /* aspect */ window.innerWidth / window.innerHeight,
      /* near */ 0.001,
      /* far */ 50
    );

    // position camera
    this.camera.position.x =  3;
    this.camera.position.y =  11;
    this.camera.position.z =  28;

    this.sceneLiquid = new Scene();
    this.sceneForeground = new Scene();

    this.container.appendChild(this.renderer.domElement);

    this.liquidParticles = new LiquidParticles(this.simulation);
    this.sceneLiquid.add(this.liquidParticles);

    if (this.settings.debugPhysics) {
      this.debugLayer = new DebugLayer();
      this.sceneForeground.add(this.debugLayer.buffer);
    }

    const scale = 40;
    const renderPassLiquid = new RenderPass(this.sceneLiquid, this.camera);
    const renderPassForeground = new RenderPass(
      this.sceneForeground,
      this.camera
    );

    this.effectLiquid = new ShaderPass(LiquidShader);
    const liquidCopyPass = new ShaderPass(CopyShader);

    //final blend pass is drawn to screen
    const blendPass = new ShaderPass(LayersBlendShader);

    this.composerLiquid = new EffectComposer(this.renderer);
    this.composerLiquid.addPass(renderPassLiquid);
    this.composerLiquid.addPass(this.effectLiquid);
    this.composerLiquid.addPass(liquidCopyPass);

    this.composerForeground = new EffectComposer(this.renderer);
    this.composerForeground.addPass(renderPassForeground);
    this.composerForeground.addPass(blendPass);

    blendPass.uniforms.textureLiquid.value =
      this.composerLiquid.renderTarget1.texture;
    blendPass.renderToScreen = true;

    for (let i = 0; i < this.settings.numberOfPenguins; i += 1) {
      const name = `penguin-${i + 1}`;
      const penguin = new Penguin();
      this.penguins[name] = penguin;
      this.sceneForeground.add(penguin);
    }

    this.addListeners();
    this.handleWindowResize();
    this.camera.updateProjectionMatrix();
    this.madeWalls = false;
    this.loop();
  }

  setcameraMode(mode) {
    this.cameraMode = mode;
  }

  loop = () => {
    this.renderCallBack = requestAnimationFrame(this.loop);
    this.render();
  };

  render() {
    if (this.paused) {
      return;
    }

    if (
      this.pressing &&
      this.simulation.world.particleSystems[0].GetPositionBuffer().length / 2 <
      this.liquidParticles.numberOfParticles
    ) {
      this.simulation.makeLiquidParticles(
        0.5,
        [this.mousePos.x, this.mousePos.y],
        [160, 110, 240, 255],
        [0,-40]
      );
      this.liquidParticles.resetBuffers(this.simulation.world);
    }


    const elapsedTime = this.clock.elapsedTime;
    const delta = this.clock.getDelta();
    this.simulation.world.Step(
      Math.min(0.03, delta),
      this.settings.velocityIterations,
      this.settings.positionIterations
    );

    if (this.settings.debugPhysics) {
      this.debugLayer.currentVertex = 0;
      this.debugLayer.draw(this.simulation.world);
    }

    this.liquidParticles.draw(this.simulation.world);

    for (let body of this.simulation.world.bodies) {
      const { childName } = body;
      if (childName && childName in this.penguins) {
        this.penguins[childName].draw(body);
      }
    }
    this.renderer.clear();

    this.composerLiquid.render();
    this.composerForeground.render();

    if (!this.madeWalls) {
      this.madeWalls = true;
      const boundingBox = document.querySelector("#svg").getBoundingClientRect();
      this.simulation.makeWalls([this.getViewportCoords(boundingBox.left, boundingBox.top), this.getViewportCoords(boundingBox.right, boundingBox.bottom)]);
    }
  }

  handleWindowResize = () => {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    this.renderer.setSize(this.stageWidth, this.stageHeight);
    this.camera.aspect = this.stageWidth / this.stageHeight;
    this.camera.updateProjectionMatrix();
    this.composerLiquid.setSize(this.stageWidth, this.stageHeight);
    this.composerForeground.setSize(this.stageWidth, this.stageHeight);
    this.madeWalls = false;
  };

  handleMouseDown = (event) => {
    if (this.mouseJoint) {
      this.simulation.world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
    }
    const p = this.getMouseCoords(event);
    const aabb = new b2AABB();
    const d = new b2Vec2();
    d.Set(0.01, 0.01);
    b2Vec2.Sub(aabb.lowerBound, p, d);
    b2Vec2.Add(aabb.upperBound, p, d);

    const queryCallback = new DynamicBodyQueryCallback(p);
    this.simulation.world.QueryAABB(queryCallback, aabb);

    this.pressing = true;

    if (queryCallback.fixture) {
      const { body } = queryCallback.fixture;
      const md = new b2MouseJointDef();
      md.bodyA = this.simulation.groundBody;
      md.bodyB = body;
      md.target = p;
      md.maxForce = 1000 * body.GetMass();
      this.mouseJoint = this.simulation.world.CreateJoint(md);
      body.SetAwake(true);
      this.targetToFollow = body;
    }
  };

  handleMouseMove = (event) => {
    if (this.mouseJoint) {
      const p = this.getMouseCoords(event);
      this.mouseJoint.SetTarget(p);
    }

    this.mousePos = this.getMouseCoords(event);
  };

  handleMouseUp = (event) => {
    if (this.mouseJoint) {
      this.simulation.world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
    }

    this.pressing = false;
  };

  getMouseCoords(event) {
    const { touches } = event;
    const { top, left } = this.renderer.domElement.getBoundingClientRect();
    let clientX, clientY;
    if (touches && touches.length) {
      clientX = touches[0].clientX - left;
      clientY = touches[0].clientY - top;
    } else {
      clientX = event.clientX - left;
      clientY = event.clientY - top;
    }

    const mouse = new Vector3();
    mouse.x = (clientX / this.stageWidth) * 2 - 1;
    mouse.y = -(clientY / this.stageHeight) * 2 + 1;
    mouse.z = 0.5;
    mouse.unproject(this.camera);
    const dir = mouse.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));
    return new b2Vec2(pos.x, pos.y);
  }

  getViewportCoords(clientX, clientY) {
    const mouse = new Vector3();
    mouse.x = (clientX / this.stageWidth) * 2 - 1;
    mouse.y = -(clientY / this.stageHeight) * 2 + 1;
    mouse.z = 0.5;
    mouse.unproject(this.camera);
    const dir = mouse.sub(this.camera.position).normalize();
    const distance = -this.camera.position.z / dir.z;
    const pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

    return new b2Vec2(pos.x, pos.y);
  }

  destroy() {
    window.cancelAnimationFrame(this.renderCallBack);
    this.simulation.destroy();
    this.removeListeners();
  }

  addListeners() {
    document.addEventListener("touchstart", this.handleMouseDown, false);
    document.addEventListener("touchmove", this.handleMouseMove, false);
    document.addEventListener("touchend", this.handleMouseUp, false);
    document.addEventListener("touchcancel", this.handleMouseUp, false);

    document.addEventListener("mousedown", this.handleMouseDown, false);
    document.addEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("mouseup", this.handleMouseUp, false);
    document.addEventListener("mouseout", this.handleMouseUp, false);

    window.addEventListener("resize", this.handleWindowResize, false);
  }

  removeListeners() {
    document.removeEventListener("touchstart", this.handleMouseDown);
    document.removeEventListener("touchmove", this.handleMouseMove);
    document.removeEventListener("touchend", this.handleMouseUp);
    document.removeEventListener("touchcancel", this.handleMouseUp);

    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mouseout", this.handleMouseUp);

    window.removeEventListener("resize", this.handleWindowResize);
  }
}
