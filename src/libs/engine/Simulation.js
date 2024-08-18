import { walls } from './assets/walls.json'
  
import { penguin } from './assets/penguin.json'

export default class Simulation {
  particleSystem;
  emitter;
  world;
  groundBody;

  constructor (numberOfPenguins, spawnAreaRadius, liquidColor, viewportCoords) {
    // Initialize a world to run simulations on
    const gravity = new b2Vec2(0, -10)
    this.world = new b2World(gravity)
    // create a physics reference to the ground, needed for handling the mouse
    const groundBodyDef = new b2BodyDef()
    this.groundBody = this.world.CreateBody(groundBodyDef)
    // because liquidfun was compiled to use the global scope (window) 
    // we need to make sure it's available outside of the module
    window.world = this.world

    const psd = new b2ParticleSystemDef();
    psd.radius = 0.09;
    this.particleSystem = this.world.CreateParticleSystem(psd);

    this.makeLiquidParticles(spawnAreaRadius, [0, 0], liquidColor)
    this.makePengiuns(numberOfPenguins)

    this.ground = null;
  }

  makeWalls(viewportCoords) {
    if (this.ground !== null) {
    this.world.DestroyBody(this.ground);
    }
    const [topLeft, bottomRight] = viewportCoords;

    const wallsVerts = walls.fixtures[0].vertices
    let topLeftPointWalls = new b2Vec2(wallsVerts[0][0].x, wallsVerts[0][0].y);
    let bottomRightPointWalls = new b2Vec2(wallsVerts[0][0].x, wallsVerts[0][0].y);
    for (let triangle of wallsVerts) {
      for (let vertice of triangle) {
        if (vertice.x < topLeftPointWalls.x) {
          topLeftPointWalls.x = vertice.x;
        }
        if (vertice.y < topLeftPointWalls.y) {
          topLeftPointWalls.y = vertice.y;
        }

        if (vertice.x > bottomRightPointWalls.x) {
          bottomRightPointWalls.x = vertice.x;
        }
        if (vertice.y > bottomRightPointWalls.y) {
          bottomRightPointWalls.y = vertice.y;
        }
      }
    }
    
    const def = new b2BodyDef()
    const ground = this.world.CreateBody(def)
    const scaleY = (bottomRight.y - topLeft.y) / (bottomRightPointWalls.y - topLeftPointWalls.y);
    const scaleX = (bottomRight.x - topLeft.x) / (bottomRightPointWalls.x - topLeftPointWalls.x);
    const transformX = topLeft.x - topLeftPointWalls.x * scaleX;
    const transformY = topLeft.y - topLeftPointWalls.y * scaleY;
    for (let triangle of wallsVerts) {
      const shape = new b2PolygonShape;
      for (let vertice of triangle) {
        shape.vertices.push(new b2Vec2(
          vertice.x * scaleX + transformX,
          vertice.y * scaleY + transformY
        ))
      }
      ground.CreateFixtureFromShape(shape, 0.5)
    }

    this.ground = ground;
  }

  makeLiquidParticles (spawnAreaRadius = 2, position = [0, 0], liquidColor = [160, 110, 240, 255], velocity = [0,0]) {
    // one group
    const spawnArea = new b2CircleShape()
    spawnArea.position.Set(position[0], position[1])
    spawnArea.radius = spawnAreaRadius
    const particleGroupDefinition = new b2ParticleGroupDef()
    particleGroupDefinition.shape = spawnArea
    particleGroupDefinition.color.Set(...liquidColor)
    particleGroupDefinition.linearVelocity.Set(...velocity)
    this.particleSystem.CreateParticleGroup(particleGroupDefinition)
  }        

  makePengiuns (numberOfPenguins) {
    const penguinVertices = penguin.fixtures[0].vertices
    const scale = 0.014
    let bd = new b2BodyDef()
    bd.type = b2_dynamicBody
    bd.sleep = false
    for (let i = 0; i < numberOfPenguins; i++) {
      let body = this.world.CreateBody(bd)
      for (let triangle of penguinVertices) {
        const shape = new b2PolygonShape;
        for (let vertice of triangle) {
          shape.vertices.push(new b2Vec2(
            vertice.x * scale,
            vertice.y * scale
          ))
        }
        body.CreateFixtureFromShape(shape, 0.5)
      }
      body.childName = 'penguin-' + (i + 1)
      body.SetTransform(new b2Vec2(-15+i*4, 30), 0)
      body.SetLinearVelocity(new b2Vec2(0,0))
      body.SetAngularVelocity(0)  
    }
  }

  destroy () {
    if (this.world !== null) {
      while (this.world.joints.length > 0) {
        this.world.DestroyJoint(this.world.joints[0]);
      }
      while (this.world.bodies.length > 0) {
        this.world.DestroyBody(this.world.bodies[0]);
      }
      while (this.world.particleSystems.length > 0) {
        this.world.DestroyParticleSystem(this.world.particleSystems[0]);
      }
    }
  }
}
