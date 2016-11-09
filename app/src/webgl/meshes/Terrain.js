import * as THREE from 'three'

class Terrain {

	/**
	* @constructor
	*/
	constructor(url) {

		this.width = 4000;
		this.height = 4000;
		this.numSegments = 100;

		this.geometry = new THREE.PlaneGeometry( this.height, this.width, this.numSegments, this.numSegments );

		this.material = new THREE.MeshLambertMaterial({
			color: 0x000000,
			wireframe: false
		});

		this.mesh = new THREE.Mesh( this.geometry, this.material );

		this.img = new Image();
		this.img.src = "/static/textures/heightmap.png";

		this.img.onload = () => {
			this.getHeightData();
		}

		var q = new THREE.Quaternion();
		q.setFromAxisAngle( new THREE.Vector3(-1,0,0), 90 * Math.PI / 180 );
		this.mesh.quaternion.multiplyQuaternions( q, this.mesh.quaternion );

	}

	/**
	*
	*/
	getTerrainPixelData() {
		var mycanvas = document.createElement("canvas");
		mycanvas.id = 'img';
		document.body.appendChild(mycanvas);
		var canvas = document.getElementById( 'img' );
		canvas.width = this.img.width;
		canvas.height = this.img.height;
		canvas.getContext('2d').drawImage(this.img, 0, 0, this.img.width, this.img.height);

		var data = canvas.getContext('2d').getImageData(0,0, this.img.height, this.img.width).data;
		var normPixels = []

		for (var i = 0, n = data.length; i < n; i += 4) {
			normPixels.push(((data[i] + data[i+1] + data[i+2]) / 3)/255);
		}

		return normPixels;
	}

	/**
	*
	*/
	getHeightData() {

 		var terrain = this.getTerrainPixelData();
		for (var i = 0, l = this.geometry.vertices.length; i < l; i++)
		{
			var ns = this.numSegments + 1;
			var vertex = this.geometry.vertices[i];
			var px = (i % ns)/(ns) * this.img.width;
			var py = Math.floor(i/ns)/(ns) * this.img.height;
			var idpx = Math.floor(this.img.width * py + px);
			var terrainValue = terrain[idpx];
			vertex.z = vertex.z + terrainValue * 200;
		}

		this.geometry.verticesNeedUpdate = true;
		this.geometry.computeFaceNormals();
		this.geometry.computeVertexNormals();
	}

		/**
		* @method
		* @name update
		* @description Triggered on every TweenMax tick
		*/
		update() {

		}
}

export default Terrain
