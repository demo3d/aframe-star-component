if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
//require('aframe-faceset-component');

/**
 * Example component for A-Frame.
 */
AFRAME.registerComponent('star', {
  schema: {
		dependencies: ['faceset'],		
    points: {default: 3},
    width: {default: 0.3}
  },

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    //this.el.setAttribute('faceset'); //use dependencies intead
  
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
    var el = this.el;
    var data = this.data;
    var points = data.points;
    var r = data.width;
    //TODO make objects directly
    //vertices
		var vts = [ new THREE.Vector3(0,0,0) ]; // add center point
		points = Math.max(2, points);
		var step = 2 * Math.PI/points;
		for (var a = 0; a < 2 * Math.PI; a += step) {
			vts.push( new THREE.Vector3( Math.cos(a), 0 , Math.sin(a) ) );
			//inner points
			vts.push( new THREE.Vector3(r*Math.cos(a+step/2), 0 , r*Math.sin(a+step/2) ) );
		}
    //el.setAttribute('faceset','vertices', vts);
    //faces
	  var faces = [];
		for ( var p = 0; p < points; p++) {
			//inner polygon, clockwise
			faces.push( new THREE.Face3( 1+(p*2+1)%(points*2), 0, 1+(2*p+3)%(points*2) ) );
			//faces.push( [1+(p*2+1)%(points*2), 0, 1+(2*p+3)%(points*2)].join(" ") );
			//outer points
			faces.push( new THREE.Face3( 1+(p*2+1)%(points*2), 1+(2*p+3)%(points*2), 1+(2*p+2)%(points*2) ) );
			//faces.push( [1+(p*2+1)%(points*2), 1+(2*p+3)%(points*2), 1+(2*p+2)%(points*2)].join(" ") );

		}
		//el.setAttribute('faceset','triangles', faces.join(", "));
		el.setAttribute('faceset', { triangles: faces, vertices: vts } );
		
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { this.el.removeAttribute('faceset'); }

});



var getMeshMixin = require('./getMeshMixin');

AFRAME.registerPrimitive('a-star', AFRAME.utils.extendDeep({}, getMeshMixin(), {
  defaultAttributes: {
    star: {
			points: 3,
			width: 0.3
		}
  },

  mappings: {
    points: 'star.points',
		width: 'star.width'
  },
  
}));  


