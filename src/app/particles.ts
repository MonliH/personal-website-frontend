/*
 * Copyright (c) 2013 Google, Inc.
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

import {
  b2MouseJoint,
  b2MouseJointDef,
  b2BodyType,
  b2LinearStiffness,
  b2AABB,
  b2Body,
  b2World,
  b2Draw,
  b2PolygonShape,
  b2ContactListener,
  b2Vec2,
  b2CircleShape,
  b2Transform,
  b2Profile,
  XY,
  b2Color,
  DrawShapes,
  DrawJoints,
  DrawAABBs,
  DrawCenterOfMasses,
  RGBA,
  b2PointState,
  b2Fixture,
} from "@box2d/core";
import {
  b2ParticleGroup,
  b2CalculateParticleIterations,
  b2ParticleSystemDef,
  b2ParticleSystem,
  b2ParticleGroupFlag,
  b2ParticleGroupDef,
  DrawParticleSystems,
} from "@box2d/particles";

export const particleColors = [
  new b2Color().SetByteRGBA(0xff, 0x00, 0x00, 0xff), // red
  new b2Color().SetByteRGBA(0x00, 0xff, 0x00, 0xff), // green
  new b2Color().SetByteRGBA(0x00, 0x00, 0xff, 0xff), // blue
  new b2Color().SetByteRGBA(0xff, 0x8c, 0x00, 0xff), // orange
  new b2Color().SetByteRGBA(0x00, 0xce, 0xd1, 0xff), // turquoise
  new b2Color().SetByteRGBA(0xff, 0x00, 0xff, 0xff), // magenta
  new b2Color().SetByteRGBA(0xff, 0xd7, 0x00, 0xff), // gold
  new b2Color().SetByteRGBA(0x00, 0xff, 0xff, 0xff), // cyan
];

/*
 * Copyright (c) 2014 Google, Inc.
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 1. The origin of this software must not be misrepresented; you must not
 * claim that you wrote the original software. If you use this software
 * in a product, an acknowledgment in the product documentation would be
 * appreciated but is not required.
 * 2. Altered source versions must be plainly marked as such, and must not be
 * misrepresented as being the original software.
 * 3. This notice may not be removed or altered from any source distribution.
 */

const noop = () => undefined;

export interface TestDebugDraw extends b2Draw {
  Prepare(
    centerX: number,
    centerY: number,
    zoom: number,
    flipY?: boolean
  ): void;
  Finish(): void;
  DrawStringWorld(x: number, y: number, message: string): void;
  DrawAABB(aabb: b2AABB, color: RGBA): void;
}

export class Settings {
  public m_testIndex = 0;

  public m_windowWidth = 1600;

  public m_windowHeight = 900;

  public m_hertz = 60;

  public m_velocityIterations = 8;

  public m_positionIterations = 3;

  // Particle iterations are needed for numerical stability in particle
  // simulations with small particles and relatively high gravity.
  // b2CalculateParticleIterations helps to determine the number.
  public m_particleIterations = b2CalculateParticleIterations(
    10,
    0.04,
    1 / this.m_hertz
  );

  public m_drawShapes = true;

  public m_drawParticles = true;

  public m_drawJoints = true;

  public m_drawAABBs = false;

  public m_drawContactPoints = false;

  public m_drawContactNormals = false;

  public m_drawContactImpulse = false;

  public m_drawFrictionImpulse = false;

  public m_drawCOMs = false;

  public m_drawControllers = true;

  public m_drawStats = false;

  public m_drawInputHelp = true;

  public m_drawFpsMeter = true;

  public m_drawProfile = false;

  public m_enableWarmStarting = true;

  public m_enableContinuous = true;

  public m_enableSubStepping = false;

  public m_enableSleep = true;

  public m_pause = false;

  public m_singleStep = false;

  public m_debugDraw: TestDebugDraw = {
    Prepare: noop,
    Finish: noop,
    PushTransform: noop,
    PopTransform: noop,
    DrawPolygon: noop,
    DrawSolidPolygon: noop,
    DrawCircle: noop,
    DrawSolidCircle: noop,
    DrawSegment: noop,
    DrawTransform: noop,
    DrawPoint: noop,
    DrawParticles: noop,
    DrawAABB: noop,
    DrawStringWorld: noop,
  };
}

import { b2ParticleFlag } from "@box2d/particles";
import { Camera } from "./camera";
import { DefaultShader } from "./manager";

export const baseParticleTypes = {
  water: b2ParticleFlag.b2_waterParticle,
  viscous: b2ParticleFlag.b2_viscousParticle,
  powder: b2ParticleFlag.b2_powderParticle,
  tensile: b2ParticleFlag.b2_tensileParticle,
  "static pressure": b2ParticleFlag.b2_staticPressureParticle,
};

export const defaultParticleTypes = {
  ...baseParticleTypes,
  spring: b2ParticleFlag.b2_springParticle,
  elastic: b2ParticleFlag.b2_elasticParticle,
  "color mixing": b2ParticleFlag.b2_colorMixingParticle,
  wall: b2ParticleFlag.b2_wallParticle,
  barrier: b2ParticleFlag.b2_barrierParticle | b2ParticleFlag.b2_wallParticle,
};

export class ParticleParameter {
  private restartOnChange = true;

  private types: Record<string, number> = defaultParticleTypes;

  private selectedKey = "";

  private defaultKey = "water";

  public constructor() {}

  public SetValues<T extends Record<string, number>>(
    types: T,
    defaultKey: keyof T
  ) {
    this.types = types;
    this.defaultKey = defaultKey as string;
  }

  public SetRestartOnChange(restartOnChange = true) {
    this.restartOnChange = restartOnChange;
  }

  public Reset() {
    this.types = defaultParticleTypes;
    this.selectedKey = "";
    this.defaultKey = "water";
    this.restartOnChange = true;
  }

  public GetSelectedKey() {
    return this.selectedKey || this.defaultKey;
  }

  public GetValue(): number {
    return this.types[this.GetSelectedKey()];
  }
}

const particleTypes = {
  ...defaultParticleTypes,
  erase: b2ParticleFlag.b2_zombieParticle,
  rigid: b2ParticleFlag.b2_waterParticle,
  "rigid barrier": b2ParticleFlag.b2_barrierParticle,
  "elastic barrier":
    b2ParticleFlag.b2_barrierParticle | b2ParticleFlag.b2_elasticParticle,
  "spring barrier":
    b2ParticleFlag.b2_barrierParticle | b2ParticleFlag.b2_springParticle,
  "repulsive wall":
    b2ParticleFlag.b2_repulsiveParticle | b2ParticleFlag.b2_wallParticle,
};

const groupFlagsByKey: Record<string, number> = {
  elastic: b2ParticleGroupFlag.b2_solidParticleGroup,
  rigid:
    b2ParticleGroupFlag.b2_rigidParticleGroup |
    b2ParticleGroupFlag.b2_solidParticleGroup,
  spring: b2ParticleGroupFlag.b2_solidParticleGroup,
  wall: b2ParticleGroupFlag.b2_solidParticleGroup,
  "rigid barrier": b2ParticleGroupFlag.b2_rigidParticleGroup,
  "elastic barrier": b2ParticleGroupFlag.b2_solidParticleGroup,
  "spring barrier": b2ParticleGroupFlag.b2_solidParticleGroup,
  "repulsive wall": b2ParticleGroupFlag.b2_solidParticleGroup,
};

const reactiveParticleFlags =
  b2ParticleFlag.b2_wallParticle |
  b2ParticleFlag.b2_springParticle |
  b2ParticleFlag.b2_elasticParticle;

const temp = {
  aabb: new b2AABB(),
};

export class ContactPoint {
  public fixtureA!: b2Fixture;

  public fixtureB!: b2Fixture;

  public readonly normal = new b2Vec2();

  public readonly position = new b2Vec2();

  public state = b2PointState.b2_nullState;

  public normalImpulse = 0;

  public tangentImpulse = 0;

  public separation = 0;
}

export interface TestContext {
  gl: WebGLRenderingContext;
  shader: DefaultShader;
  particleParameter: ParticleParameter;
}

export class DrawingParticles extends b2ContactListener {
  public static readonly k_maxContactPoints = 2048;

  public m_lastGroup: b2ParticleGroup | null;
  public m_particleSystem: b2ParticleSystem;

  public m_colorIndex = 0;
  public m_world: b2World;
  public particleParameter: ParticleParameter;

  public m_mouseTracing = false;
  public readonly m_mouseWorld = new b2Vec2();
  public m_mouseJoint: b2MouseJoint | null = null;

  public m_groundBody: b2Body;

  public m_pointCount = 0;
  public m_stepCount = 0;
  public camera = new Camera();

  public readonly m_maxProfile = new b2Profile();

  public readonly m_totalProfile = new b2Profile();

  public readonly m_mouseTracerPosition = new b2Vec2();

  public readonly m_mouseTracerVelocity = new b2Vec2();

  public readonly m_points = Array.from(
    { length: DrawingParticles.k_maxContactPoints },
    () => new ContactPoint()
  );

  public constructor({ particleParameter }: TestContext) {
    super();

    this.particleParameter = particleParameter;
   
    const particleSystemDef = new b2ParticleSystemDef();

    this.m_world = b2World.Create({ x: 0, y: -10 });
    this.m_particleSystem =
      this.m_world.CreateParticleSystem(particleSystemDef);

    this.m_particleSystem.SetGravityScale(0.4);
    this.m_particleSystem.SetDensity(1.2);

    this.m_groundBody = this.m_world.CreateBody();

    {
      const ground = this.m_world.CreateBody();

      {
        const shape = new b2PolygonShape();
        const vertices = [
          new b2Vec2(-4, -2),
          new b2Vec2(4, -2),
          new b2Vec2(4, 0),
          new b2Vec2(-4, 0),
        ];
        shape.Set(vertices, 4);
        ground.CreateFixture({ shape });
      }

      {
        const shape = new b2PolygonShape();
        const vertices = [
          new b2Vec2(-4, -2),
          new b2Vec2(-2, -2),
          new b2Vec2(-2, 6),
          new b2Vec2(-4, 6),
        ];
        shape.Set(vertices, 4);
        ground.CreateFixture({ shape });
      }

      {
        const shape = new b2PolygonShape();
        const vertices = [
          new b2Vec2(2, -2),
          new b2Vec2(4, -2),
          new b2Vec2(4, 6),
          new b2Vec2(2, 6),
        ];
        shape.Set(vertices, 4);
        ground.CreateFixture({ shape });
      }

      {
        const shape = new b2PolygonShape();
        const vertices = [
          new b2Vec2(-4, 4),
          new b2Vec2(4, 4),
          new b2Vec2(4, 6),
          new b2Vec2(-4, 6),
        ];
        shape.Set(vertices, 4);
        ground.CreateFixture({ shape });
      }
    }

    this.m_colorIndex = 0;
    this.m_particleSystem.SetRadius(0.05 * 2);
    this.m_lastGroup = null;

    this.particleParameter.SetValues(particleTypes, "water");
    this.particleParameter.SetRestartOnChange(false);
  }

  public getGroupFlags() {
    return groupFlagsByKey[this.particleParameter.GetSelectedKey()] ?? 0;
  }

  public RunStep(settings: Settings) {
    let timeStep = settings.m_hertz > 0 ? 1 / settings.m_hertz : 0;

    if (settings.m_pause) {
        if (settings.m_singleStep) {
            settings.m_singleStep = false;
        } else {
            timeStep = 0;
        }
    }
    this.Step(settings, timeStep);
}

  public MouseMove(p: b2Vec2, leftDrag: boolean) {
    this.m_mouseWorld.Copy(p);

    if (leftDrag && this.m_mouseJoint) {
      this.m_mouseJoint.SetTarget(p);
    }

    if (leftDrag) {
      const parameterValue = this.particleParameter.GetValue();
      const shape = new b2CircleShape();
      shape.m_p.Copy(p);
      shape.m_radius = 0.2;

      this.m_particleSystem.DestroyParticlesInShape(
        shape,
        b2Transform.IDENTITY
      );

      const groupFlags = this.getGroupFlags();

      const joinGroup =
        this.m_lastGroup && groupFlags === this.m_lastGroup.GetGroupFlags();
      if (!joinGroup)
        this.m_colorIndex = (this.m_colorIndex + 1) % particleColors.length;

      const pd = new b2ParticleGroupDef();
      pd.shape = shape;
      pd.flags = parameterValue;
      if (parameterValue & reactiveParticleFlags)
        pd.flags |= b2ParticleFlag.b2_reactiveParticle;
      pd.groupFlags = groupFlags;
      pd.color.Copy(particleColors[this.m_colorIndex]);
      pd.group = this.m_lastGroup;
      this.m_lastGroup = this.m_particleSystem.CreateParticleGroup(pd);
      this.m_mouseTracing = false;
    }
  }

  public MouseDown(p: b2Vec2): void {
    this.m_mouseWorld.Copy(p);

    this.m_mouseTracing = true;
    this.m_mouseTracerPosition.Copy(p);
    this.m_mouseTracerVelocity.SetZero();

    if (this.m_mouseJoint !== null) {
      this.m_world.DestroyJoint(this.m_mouseJoint);
      this.m_mouseJoint = null;
    }

    let hit_fixture: b2Fixture | undefined;

    // Query the world for overlapping shapes.
    this.m_world.QueryPointAABB(p, (fixture) => {
      const body = fixture.GetBody();
      if (body.GetType() === b2BodyType.b2_dynamicBody) {
        const inside = fixture.TestPoint(p);
        if (inside) {
          hit_fixture = fixture;
          return false; // We are done, terminate the query.
        }
      }
      return true; // Continue the query.
    });

    if (hit_fixture) {
      const frequencyHz = 5;
      const dampingRatio = 0.7;

      const body = hit_fixture.GetBody();
      const md = new b2MouseJointDef();
      md.bodyA = this.m_groundBody;
      md.bodyB = body;
      md.target.Copy(p);
      md.maxForce = 1000 * body.GetMass();
      b2LinearStiffness(md, frequencyHz, dampingRatio, md.bodyA, md.bodyB);

      this.m_mouseJoint = this.m_world.CreateJoint(md) as b2MouseJoint;
      body.SetAwake(true);
    }
  }

  public MouseUp(p: b2Vec2) {
    this.m_mouseTracing = false;

    if (this.m_mouseJoint) {
      this.m_world.DestroyJoint(this.m_mouseJoint);
      this.m_mouseJoint = null;
    }

    this.m_lastGroup = null;
  }

  public ParticleGroupDestroyed(group: b2ParticleGroup) {
    if (group === this.m_lastGroup) {
      this.m_lastGroup = null;
    }
  }

  public SplitParticleGroups() {
    for (
      let group = this.m_particleSystem.GetParticleGroupList();
      group;
      group = group.GetNext()
    ) {
      if (
        group !== this.m_lastGroup &&
        group.GetGroupFlags() & b2ParticleGroupFlag.b2_rigidParticleGroup &&
        group.GetAllParticleFlags() & b2ParticleFlag.b2_zombieParticle
      ) {
        // Split a rigid particle group which may be disconnected
        // by destroying particles.
        this.m_particleSystem.SplitParticleGroup(group);
      }
    }
  }

  public Step(settings: Settings, timeStep: number) {
    if (
      this.m_particleSystem.GetAllParticleFlags() &
      b2ParticleFlag.b2_zombieParticle
    ) {
      this.SplitParticleGroups();
    }

    this.m_world.SetAllowSleeping(settings.m_enableSleep);
    this.m_world.SetWarmStarting(settings.m_enableWarmStarting);
    this.m_world.SetContinuousPhysics(settings.m_enableContinuous);
    this.m_world.SetSubStepping(settings.m_enableSubStepping);

    this.m_pointCount = 0;

    this.m_world.Step(timeStep, {
      velocityIterations: settings.m_velocityIterations,
      positionIterations: settings.m_positionIterations,
      particleIterations: settings.m_particleIterations,
    });

    const { aabb } = temp;
    const draw = settings.m_debugDraw;
    this.camera.unproject(
      { x: 0, y: this.camera.getHeight() },
      aabb.lowerBound
    );
    this.camera.unproject({ x: this.camera.getWidth(), y: 0 }, aabb.upperBound);

    if (settings.m_drawShapes) {
      DrawShapes(draw, this.m_world, aabb);
    }
    if (settings.m_drawParticles) {
      DrawParticleSystems(draw, this.m_world);
    }
    if (settings.m_drawJoints) {
      DrawJoints(draw, this.m_world);
    }
    if (settings.m_drawAABBs) {
      DrawAABBs(draw, this.m_world);
    }
    if (settings.m_drawCOMs) {
      DrawCenterOfMasses(draw, this.m_world);
    }

    if (timeStep > 0) {
      ++this.m_stepCount;
    }

    // Track maximum profile times
    {
      const p = this.m_world.GetProfile();
      this.m_maxProfile.step = Math.max(this.m_maxProfile.step, p.step);
      this.m_maxProfile.collide = Math.max(
        this.m_maxProfile.collide,
        p.collide
      );
      this.m_maxProfile.solve = Math.max(this.m_maxProfile.solve, p.solve);
      this.m_maxProfile.solveInit = Math.max(
        this.m_maxProfile.solveInit,
        p.solveInit
      );
      this.m_maxProfile.solveVelocity = Math.max(
        this.m_maxProfile.solveVelocity,
        p.solveVelocity
      );
      this.m_maxProfile.solvePosition = Math.max(
        this.m_maxProfile.solvePosition,
        p.solvePosition
      );
      this.m_maxProfile.solveTOI = Math.max(
        this.m_maxProfile.solveTOI,
        p.solveTOI
      );
      this.m_maxProfile.broadphase = Math.max(
        this.m_maxProfile.broadphase,
        p.broadphase
      );

      this.m_totalProfile.step += p.step;
      this.m_totalProfile.collide += p.collide;
      this.m_totalProfile.solve += p.solve;
      this.m_totalProfile.solveInit += p.solveInit;
      this.m_totalProfile.solveVelocity += p.solveVelocity;
      this.m_totalProfile.solvePosition += p.solvePosition;
      this.m_totalProfile.solveTOI += p.solveTOI;
      this.m_totalProfile.broadphase += p.broadphase;
    }

    if (settings.m_drawProfile) {
      const p = this.m_world.GetProfile();

      const aveProfile = new b2Profile();
      if (this.m_stepCount > 0) {
        const scale = 1 / this.m_stepCount;
        aveProfile.step = scale * this.m_totalProfile.step;
        aveProfile.collide = scale * this.m_totalProfile.collide;
        aveProfile.solve = scale * this.m_totalProfile.solve;
        aveProfile.solveInit = scale * this.m_totalProfile.solveInit;
        aveProfile.solveVelocity = scale * this.m_totalProfile.solveVelocity;
        aveProfile.solvePosition = scale * this.m_totalProfile.solvePosition;
        aveProfile.solveTOI = scale * this.m_totalProfile.solveTOI;
        aveProfile.broadphase = scale * this.m_totalProfile.broadphase;
      }
    }

    if (this.m_mouseTracing && !this.m_mouseJoint) {
      const delay = 0.1;
      const acceleration = new b2Vec2();
      acceleration.x =
        (2 / delay) *
        ((1 / delay) * (this.m_mouseWorld.x - this.m_mouseTracerPosition.x) -
          this.m_mouseTracerVelocity.x);
      acceleration.y =
        (2 / delay) *
        ((1 / delay) * (this.m_mouseWorld.y - this.m_mouseTracerPosition.y) -
          this.m_mouseTracerVelocity.y);
      this.m_mouseTracerVelocity.AddScaled(timeStep, acceleration);
      this.m_mouseTracerPosition.AddScaled(
        timeStep,
        this.m_mouseTracerVelocity
      );
    }

    if (settings.m_drawContactPoints) {
      const k_impulseScale = 0.1;
      const k_axisScale = 0.3;

      for (let i = 0; i < this.m_pointCount; ++i) {
        const point = this.m_points[i];

        if (point.state === b2PointState.b2_addState) {
          // Add
          draw.DrawPoint(point.position, 10, new b2Color(0.3, 0.95, 0.3));
        } else if (point.state === b2PointState.b2_persistState) {
          // Persist
          draw.DrawPoint(point.position, 5, new b2Color(0.3, 0.3, 0.95));
        }

        if (settings.m_drawContactNormals) {
          const p1 = point.position;
          const p2 = b2Vec2.Add(
            p1,
            b2Vec2.Scale(k_axisScale, point.normal, b2Vec2.s_t0),
            new b2Vec2()
          );
          draw.DrawSegment(p1, p2, new b2Color(0.9, 0.9, 0.9));
        } else if (settings.m_drawContactImpulse) {
          const p1 = point.position;
          const p2 = b2Vec2.AddScaled(
            p1,
            k_impulseScale * point.normalImpulse,
            point.normal,
            new b2Vec2()
          );
          draw.DrawSegment(p1, p2, new b2Color(0.9, 0.9, 0.3));
        }

        if (settings.m_drawFrictionImpulse) {
          const tangent = b2Vec2.CrossVec2One(point.normal, new b2Vec2());
          const p1 = point.position;
          const p2 = b2Vec2.AddScaled(
            p1,
            k_impulseScale * point.tangentImpulse,
            tangent,
            new b2Vec2()
          );
          draw.DrawSegment(p1, p2, new b2Color(0.9, 0.9, 0.3));
        }
      }
    }
  }

  public GetDefaultViewZoom() {
    return 250;
  }

  public getCenter(): XY {
    return {
      x: 0,
      y: 2,
    };
  }
}
