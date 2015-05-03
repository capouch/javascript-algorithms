(function (exports) {
  'use strict';

  function comparator(a, b) {
    return a - b;
  }

  var heapSort = (function () {

    /**
     * Finds the correct place of given element in given max heap.
     *
     * @private
     * @param {Array} array Array.
     * @param {Number} index Index of the element which palce in
     * the max heap should be found.
     * @param {Number} heapSize Size of the heap.
     * @param {function} cmp Comparison function.
     */
    function heapify(array, index, heapSize, cmp, debug) {
      var left = 2 * index + 1;
      var right = 2 * index + 2;
      var largest = index;

      if (left < heapSize && cmp(array[left], array[index]) > 0) {
        largest = left;
      }

      if (right < heapSize && cmp(array[right], array[largest]) > 0) {
        largest = right;
      }

      if (largest !== index) {
	// DEBUG 
	if (debug) 
	  console.log('Swapping ' + array[largest] + ' and ' + array[index]);
        var temp = array[index];
        array[index] = array[largest];
        array[largest] = temp;
	//if(debug)
	//  console.log('Calling heapify recursively');
        heapify(array, largest, heapSize, cmp);
      }
    }

    /**
     * Builds max heap from given array.
     *
     * @private
     * @param {Array} array Array which should be turned into max heap.
     * @param {function} cmp Comparison function.
     * @return {Array} array Array turned into max heap.
     */
    function buildMaxHeap(array, cmp, debug) {
      for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
	if (debug)
	  console.log('Calling heapify from for loop');
        heapify(array, i, array.length, cmp);
      }
      return array;
    }

    /**
     * Heapsort. Turns the input array into max
     * heap and after that sorts it.<br><br>
     * Time complexity: O(N log N).
     *
     * @example
     *
     * var sort = require('path-to-algorithms/src' +
     * '/sorting/heapsort').heapSort;
     * console.log(sort([2, 5, 1, 0, 4])); // [ 0, 1, 2, 4, 5 ]
     *
     * @public
     * @module sorting/heapsort
     * @param {Array} array Input array.
     * @param {Function} cmp Optional. A function that defines an
     * alternative sort order. The function should return a negative,
     * zero, or positive value, depending on the arguments.
     * @return {Array} Sorted array.
     */
    return function (array, cmp, debug) {
      cmp = cmp || comparator;
      debug = debug || false;
      if (debug)
        console.log('Swaps during initial heap construction:');
      var size = array.length;
      var temp;
      buildMaxHeap(array, cmp, debug);

      if (debug)
        console.log('Heap is built; calls below are adjusting:');
      for (var i = array.length - 1; i > 0; i -= 1) {
        temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        size -= 1;
        heapify(array, 0, size, cmp, debug);
      }
      return array;
    };
  }());

  exports.heapSort = heapSort;

})(typeof window === 'undefined' ? module.exports : window);
