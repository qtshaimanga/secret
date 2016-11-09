const THREE = require('three');

class Scene {

    /**
     * @constructor
     */
    constructor(width, height) {

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0xF5F5F5);

        this.camera = new THREE.PerspectiveCamera(74, width / height, 1, 1000);
        this.camera.position.z = 0;

        this.addLight();

    }

    addLight(){
      this.scene.add(new THREE.AmbientLight(0x404040));

      this.directional = new THREE.DirectionalLight(0x808080);
      this.directional.position.set(1, 1, 1);
      this.directional.lookAt(new THREE.Vector3());
      this.scene.add(this.directional);

    }

    /**
     * @method
     * @name add
     * @description Add a child to the scene
     * @param {object} child - A THREE object
     */
    add(child) {

      this.scene.add(child);

    }

    /**
     * @method
     * @name remove
     * @description Remove a child from the scene
     * @param {object} child - A THREE object
     */
    remove(child) {

      this.scene.remove(child);

    }

    /**
     * @method
     * @name render
     * @description Renders/Draw the scene
     */
    render() {

      this.renderer.autoClearColor = true;
      this.renderer.render(this.scene, this.camera);

    }

    /**
     * @method
     * @name resize
     * @description Resize the scene according to screen size
     * @param {number} newWidth
     * @param {number} newHeight
     */
    resize(newWidth, newHeight) {

      this.camera.aspect = newWidth / newHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(newWidth, newHeight);

    }

}

export default Scene