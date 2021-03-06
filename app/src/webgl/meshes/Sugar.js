import * as THREE from 'three';

import { UniformsUtils } from '../utils/UniformsUtils';
import { UniformsLib } from '../utils/UniformsLib';

import vertexShader from '../shaders/sugarSecrets/vertexShader.vert';
import fragmentShader from '../shaders/sugarSecrets/fragmentShader.frag';

var size = 50;
var widthSegments = 30;
var heightSegments = 30;
var geometry = new THREE.SphereGeometry(size, widthSegments, heightSegments);

class Sugar {

	/**
	* @constructor
	*/
	constructor(color) {
		this.time = 0.01;
		this.color = Number(color);

		// tester phong
		this.material = new THREE.ShaderMaterial({
			uniforms: UniformsUtils.merge([
				UniformsLib.common,
				UniformsLib.aomap,
				UniformsLib.lightmap,
				UniformsLib.emissivemap,
				UniformsLib.bumpmap,
				UniformsLib.normalmap,
				UniformsLib.displacementmap,
				UniformsLib.roughnessmap,
				UniformsLib.metalnessmap,
				UniformsLib.fog,
				UniformsLib.lights,
				{
					emissive : { value: new THREE.Color( this.color ) },
					roughness: { value: .8 },
					metalness: { value: 1.0 },
					envMapIntensity : { value: 1 },
					u_time: { type: "f", value: 0.1 },
					u_speed: { type: 'f', value: 0.3 },
					u_amp: { type: 'f', value: 40.0 }
				}
			]),
			fragmentShader: fragmentShader,
			vertexShader: vertexShader,
			lights: true,
			fog: true
			//shading: THREE.FlatShading,
			//wireframe: true
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

export default Sugar
