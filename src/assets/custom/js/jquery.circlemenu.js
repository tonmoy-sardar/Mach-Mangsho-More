/*!
 * jQuery Circle Menu
 * https://github.com/Richard1320/jQuery-Circle-Menu
 *
 * Author
 * Richard Hung
 * http://www.magicmediamuse.com/
 *
 * Version
 * 1.0.1
 *
 * Copyright (c) 2018 Richard Hung.
 *
 * License
 * jQuery Circle Menu by Richard Hung is licensed under a MIT License.
 * http://opensource.org/licenses/MIT
 */

(function($) {
  'use strict';

  // Create the plugin name and defaults once
  var pluginName = 'circleMenu';
  var mouse = {
    x: 0,
    y: 0,
  };

  var methods = {
    init: function(overrides) {
      // Set default parameters
      var defaultSettings = {
        defaultRotation: 0, // Angle to start rotation, and angle for focus rotate
        drawLine: false, // Animate line from 0 to focused child element
        dragMouse: false, // Click and drag to rotate the circle
        dragTouch: false, // Touch and drag to rotate the circle
        dragDirection: 'horizontal', // Drag up and down or left and right
        lockDirection: false, // Invert the rotation of child items to ensure content is always facing up
        focusRotate: false, // Rotate to highlight currently focus item
        rotateDirection: 'clockwise', // Rotate clockwise or couter-clockwise when dragging down or right
      }; // End options

      // Override default options
      var settings = $.extend({}, defaultSettings, overrides);

      return this.each(function() {
        var $this = $(this);
        var wrapper = $this.children();
        var children = wrapper.children();
        $this
          .addClass('circle-menu')
          .data('settings', settings)
          .data('currentOffset', settings.defaultRotation);
        wrapper
          .addClass('circle-menu__circle')
          .css('transform', 'rotate(' + settings.defaultRotation + 'deg)');
        children
          .addClass('circle-menu__circle__item')
          .wrapInner('<div class="circle-menu__circle__item__inner"></div>');
        $this[pluginName]('update');

        if (settings.dragMouse || settings.dragTouch) {
          if (settings.dragDirection == 'horizontal') {
            $this.addClass('is-draggable-horizontal');
          } else {
            $this.addClass('is-draggable-vertical');
          }
          $this[pluginName]('bindDrag');
        }

        wrapper.append(
          '<svg class="circle-menu__circle__svg" viewbox="0 0 100 100"><circle class="circle-menu__circle__svg__circle" cx="50" cy="50" r="50" transform="rotate(-90 50 50)" /><circle class="circle-menu__circle__svg__line" cx="50" cy="50" r="50" transform="rotate(-90 50 50)" /></svg>'
        );
      }); // End object loop
    }, // End init
    update: function() {
      // Reposition all child elements
      return this.each(function() {
        var $this = $(this);
        var children = $this.find('.circle-menu__circle__item');
        var settings = $this.data('settings');
        var count = children.length;
        var increment = 360 / count;

        children.each(function() {
          var $child = $(this);
          var index = $child.index();
          var rotate = index * increment;
          $child
            .css('transform', 'rotate(' + rotate + 'deg)')
            .data('offsetRotate', rotate);
        });

        if (settings.lockDirection) $this[pluginName]('reLockChildren');

        $this[pluginName]('directionClasses');
      });
    }, // End update
    reLockChildren: function() {
      // Invert the rotation of child items to ensure they always face up
      var currentOffset = this.data('currentOffset');
      return this.find('.circle-menu__circle__item').each(function() {
        var offsetRotate = $(this).data('offsetRotate');
        $(this)
          .children('.circle-menu__circle__item__inner')
          .css(
            'transform',
            'rotate(' + (offsetRotate + currentOffset) * -1 + 'deg)'
          );
      });
    },
    directionClasses: function() {
      var $this = this;
      var children = $this.find('.circle-menu__circle__item');
      var rotate = $this.data('currentOffset');

      children.removeClass(
        'position--top position--left position--right position--bottom position--bottom-right position--top-left position--top-left position--top-right position--bottom-left position--bottom-right'
      );

      children.each(function() {
        var $child = $(this);
        var offset = $child.data('offsetRotate');
        var current = rotate + offset;

        // Make sure calculation is always between 0 and 360
        if (current < 0) current = current + 360;
        if (current > 360) current = current - 360;

        if (
          (current >= 337 && current <= 360) ||
          (current >= 0 && current < 22)
        ) {
          $child.addClass('position--top');
        } else if (current >= 22 && current < 67) {
          $child.addClass('position--top-right');
        } else if (current >= 67 && current < 112) {
          $child.addClass('position--right');
        } else if (current >= 112 && current < 157) {
          $child.addClass('position--bottom-right');
        } else if (current >= 157 && current < 202) {
          $child.addClass('position--bottom');
        } else if (current >= 202 && current < 247) {
          $child.addClass('position--bottom-left');
        } else if (current >= 247 && current < 292) {
          $child.addClass('position--left');
        } else if (current >= 292 && current < 337) {
          $child.addClass('position--top-left');
        }
      });
    },
    bindDrag: function() {
      var settings = this.data('settings');
      var e_start = '';
      var e_move = '';
      var e_stop = '';

      if (settings.dragMouse) {
        e_start = e_start + 'mousedown ';
        e_move = e_move + 'mousemove ';
        e_stop = e_stop + 'mouseup ';
      }
      if (settings.dragTouch) {
        e_start = e_start + 'touchstart ';
        e_move = e_move + 'touchmove ';
        e_stop = e_stop + 'touchend touchcancel ';
      }

      this.on(e_start, function(e) {
        var $this = $(this);
        var settings = $this.data('settings');

        // Change event properties if touch or mouse
        var event = e;
        if (e.type == 'touchstart')
          event =
            e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

        mouse.x = event.pageX - $this.offset().left;
        mouse.y = event.pageY - $this.offset().top;

        $this.on(e_move, function(e) {
          // Change event properties if touch or mouse
          var event = e;
          if (e.type == 'touchmove')
            event =
              e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

          var x = event.pageX - $this.offset().left;
          var y = event.pageY - $this.offset().top;
          var move =
            settings.dragDirection == 'horizontal' ? x - mouse.x : y - mouse.y;
          var currentOffset =
            settings.rotateDirection == 'clockwise'
              ? $this.data('currentOffset') + move
              : $this.data('currentOffset') - move;
          mouse.x = x;
          mouse.y = y;

          $this[pluginName]('rotateTo', currentOffset);

          e.preventDefault();
        });
        $(window).one(e_stop, function() {
          $this.off(e_move);
        });
      });

      // Stop event bubbling from the drag
      this.find('.circle-menu__circle__item').on(e_start, function(e) {
        e.stopPropagation();
      });

      return this;
    },
    rotateTo: function(degrees) {
      return this.each(function() {
        var $this = $(this);
        var settings = $this.data('settings');
        var circle = $this.children('.circle-menu__circle');

        // Make sure degrees doesn't go past 360
        if (degrees > 360) degrees = degrees - 360;

        // Make sure degrees is never negative
        if (degrees < 0) degrees = degrees + 360;

        $this.data('currentOffset', degrees);

        circle.css('transform', 'rotate(' + degrees + 'deg)');

        if (settings.lockDirection) $this[pluginName]('reLockChildren');

        $this[pluginName]('directionClasses');
      });
    },
    focus: function(index) {
      // Focus on a child element as being "active"
      return this.each(function() {
        var $this = $(this);
        var circle = $this.children('.circle-menu__circle');
        var settings = $this.data('settings');
        var dashArray = 315;
        var children = $this.find('.circle-menu__circle__item');
        var count = children.length;
        var increment = dashArray / count;
        var dashOffset = dashArray - increment * index;
        var rotateTo = (360 / count) * index * -1 + settings.defaultRotation;

        children
          .removeClass('is-active')
          .eq(index)
          .addClass('is-active');

        if (settings.drawLine)
          $this
            .find('.circle-menu__circle__svg__line')
            .css('stroke-dashoffset', dashOffset);

        if (settings.focusRotate) {
          // Create custom animation tween
          circle.css('z-index', $this.data('currentOffset'));
          circle.animate(
            {
              zIndex: rotateTo,
            },
            {
              step: function(now, fx) {
                $this[pluginName]('rotateTo', now);
              },
              duration: 1000,
            }
          );
        }
      });
    },
    destroy: function() {
      return this.each(function() {
        alert('destroy');
      });
    }, // End destroy
  }; // End method

  $.fn[pluginName] = function(method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.' + pluginName);
    }
  }; // End plugin
})(jQuery);
