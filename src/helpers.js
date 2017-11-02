(function(window){
	
	/**
	 * Polyfil for String.startsWith as it is not implemented in IE
	 * @param  {[type]} !String.prototype.startsWith [description]
	 * @return {[type]}                              [description]
	 */
	if (!String.prototype.startsWith) {
    	String.prototype.startsWith = function(searchString, position){
      		return this.substr(position || 0, searchString.length) === searchString;
  		};
	}

})(window);