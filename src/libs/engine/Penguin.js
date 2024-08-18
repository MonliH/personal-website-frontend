import { Mesh, MeshBasicMaterial, InstancedBufferGeometry, PlaneBufferGeometry, BoxGeometry, Sprite, TextureLoader, SpriteMaterial, RepeatWrapping } from 'three'


export default class Penguin extends Sprite {
  
  constructor () {
    const map = new TextureLoader().load(
      'assets/head.png',
      texture => {
        // flip the texture vertically to match our geometry
        texture.wrapT = RepeatWrapping
        texture.repeat.y = - 1
      })
    const material = new SpriteMaterial({ map })
    super(material)
  }

  draw (body) {
    const position = body.GetWorldCenter()
    const angle = body.GetAngle()
    if (position.y < -50) {
      body.SetTransform(new b2Vec2(15, 30), 0)
      body.SetLinearVelocity(new b2Vec2(0,0))
      body.SetAngularVelocity(0)
    }
    this.position.x = position.x
    this.position.y = position.y
    const imageSize = {
      width: 469,
      height: 604
    }
    const scale = 0.008
    this.scale.set(
      imageSize.width * scale, 
      imageSize.height * scale,
      1
    )
    this.material.rotation = angle
  }
}
