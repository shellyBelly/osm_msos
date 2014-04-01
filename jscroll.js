
// Plugin:      jScroll
// Author:      William Duffy
// Website:     http://www.wduffy.co.uk/jScroll
// Version:     1.1

// Copyright (c) 2011, William Duffy - www.wduffy.co.uk

// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

// Very slight alteration to work under MobileSiteOS

/*global
    msos: false,
    jQuery: false
*/

msos.provide("msos.jscroll");

msos.jscroll.version = new msos.set_version(13, 6, 14);


(function ($) {
    "use strict";

    // Public: jScroll Plugin
    $.fn.jScroll = function (options) {

        var opts = $.extend({}, $.fn.jScroll.defaults, options);

        // Private 
        function Location($element) {

            this.min = $element.offset().top;
            this.originalMargin = parseInt($element.css("margin-top"), 10) || 0;

            this.getMargin = function ($window) {
                var max = $element.parent().height() - $element.outerHeight(),
                    margin = this.originalMargin;

                if ($window.scrollTop() >= this.min) {
                    margin = margin + opts.top + $window.scrollTop() - this.min;
                }
                if (margin > max) {
                    margin = max;
                }
                return ({
                    "marginTop": margin + 'px'
                });
            };
        }

        return this.each(

        function () {
            var $element = $(this),
                $window = $(window),
                locator = new Location($element);

            $window.scroll(

                function () {
                    $element.stop().animate(locator.getMargin($window), opts.speed);
                }
            );
        });
    };

    // Public: Default values
    $.fn.jScroll.defaults = {
        speed: "slow",
        top: 10
    };

}(jQuery));