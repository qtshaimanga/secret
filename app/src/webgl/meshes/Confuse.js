import * as THREE from 'three';

import { UniformsUtils } from '../utils/UniformsUtils';
import { UniformsLib } from '../utils/UniformsLib';

import vertexShader from '../shaders/confuseSecrets/vertexShader.vert';
import fragmentShader from '../shaders/confuseSecrets/fragmentShader.frag';


var size = 40;
var widthSegments = 6;
var heightSegments = 6;
var geometry = new THREE.SphereGeometry(size, widthSegments, heightSegments);

class Confuse {

	/**
	* @constructor
	*/
	constructor(objectTexture) {


		this.time = 0.01;

		this.loader = new THREE.TextureLoader();

		var texture = new THREE.Texture(objectTexture.file);
		texture.needsUpdate = true;

		this.material = new THREE.ShaderMaterial({
			uniforms: {
				...UniformsLib.common,
				...UniformsLib.aomap,
				...UniformsLib.lightmap,
				...UniformsLib.emissivemap,
				...UniformsLib.bumpmap,
				...UniformsLib.normalmap,
				...UniformsLib.displacementmap,
				...UniformsLib.roughnessmap,
				...UniformsLib.metalnessmap,
				...UniformsLib.fog,
				...UniformsLib.lights,
				emissive : { value: new THREE.Color( 0x8e8e8e ) },
				roughness: { value: .7 },
				metalness: { value: .2 },
				envMapIntensity : { value: 1 },
				u_time: { type: "f", value: 0.1 },
				u_speed: { type: 'f', value: 2.5 },
				u_amp: { type: 'f', value: 60.0 },
				u_texture:   { type:"t", value: texture },
			},
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
			shading: THREE.FlatShading,
			lights: true,
			fog: true,
			wireframe: true
		});

		this.mesh = new THREE.Mesh(geometry, this.material);

	}

	/**
	* @method
	* @name update
	* @description Triggered on every TweenMax tick
	*/
	update() {

		this.material.uniforms.u_time.value += this.time;

	}

	/**
	*/
	rotation(start){

		if(start == true){
			this.mesh.rotation.x += this.time*0.5;
			this.mesh.rotation.y += this.time*0.5;
			this.mesh.rotation.z += this.time*0.5;
		}

	}

}

export default Confuse
