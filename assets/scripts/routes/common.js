// Common js

import jQueryBridget from 'jquery-bridget';
import Masonry from 'masonry-layout';
import ImagesLoaded from 'imagesloaded';
import mediumZoom from 'medium-zoom';

import appState from '../util/appState';

// Shared vars
let $window = $(window),
    $body = $('body'),
    $document = $(document),
    $imageGrid,
    $toTop = $('#to-top'),
    $siteNav = $('.site-nav'),
    $navToggle = $('#nav-toggle'),
    transitionElements = [],
    resizeTimer,
    $smiley = $('.smiley svg'),
    $newSmiley,
    smileyDump,
    smileyCount;

let gridOptions = {
  itemSelector: '.grid-item',
  columnWidth: '.grid-sizer',
  percentPosition: true,
  transitionDuration: 0
}

let smileyMarkup = '<svg class="new-smiley" x="0px" y="0px" viewBox="0 0 798.9 711.2" style="enable-background:new 0 0 798.9 711.2;" xml:space="preserve"><path class="smiley-background" d="M544.6,675.9c-71.3,30.8-158.6,40.9-236,32.7c-40.1-4.3-86.5-18-121.7-38 c-19.3-11-37.4-23.7-55.2-36.8C113,620.1,94.8,609,79.5,591.3c-22.4-25.9-41.5-56.5-50.3-89c-4.4-16.2-15.1-29.6-19.5-46.3 c-5.1-19.5-11-38.9-9-59.4c7.5-76.7,17.9-166.3,66.7-229c20.9-26.8,41.5-57.8,68.9-78.5c13.4-10.2,26.4-20.5,39.8-30.4 c6.9-5.1,14.8-8.5,21.7-13.7c7.9-6,12.4-6.4,21.5-9.6c7.7-2.7,12.6-9.4,20-12.7c7.2-3.3,16-4.4,23.6-7.1 c21.6-7.5,43.5-10.5,66.3-9.8c39.7,1.2,78.7-8.4,119-2.9c18.1,2.5,36.3,4.6,54.4,6.9c22.6,2.9,41.9,9.9,63.7,15.8 c16.6,4.5,32.9,11.8,48.1,19.8c8.9,4.7,16.6,11.9,25.1,16.4c9.9,5.2,20.8,7.1,30.7,13.1c73.7,44.9,114.4,120.4,126.3,204.5 c6.6,46.6-3.2,89.9-11.8,135.2c-7.7,40.5-26.6,76.2-44.6,112.9c-18.4,37.5-54.1,72.1-88.7,94.8c-18.5,12.2-38.1,22.8-57.1,34.1 C589.1,659.6,546.2,679.5,544.6,675.9z"/><path class="smiley-face" d="M544.6,675.9c-71.3,30.8-158.6,40.9-236,32.7c-40.1-4.3-86.5-18-121.7-38c-19.3-11-37.4-23.7-55.2-36.8 C113,620.1,94.8,609,79.5,591.3c-22.4-25.9-41.5-56.5-50.3-89c-4.4-16.2-15.1-29.6-19.5-46.3c-5.1-19.5-11-38.9-9-59.4 c7.5-76.7,17.9-166.3,66.7-229c20.9-26.8,41.5-57.8,68.9-78.5c13.4-10.2,26.4-20.5,39.8-30.4c6.9-5.1,14.8-8.5,21.7-13.7 c7.9-6,12.4-6.4,21.5-9.6c7.7-2.7,12.6-9.4,20-12.7c7.2-3.3,16-4.4,23.6-7.1c21.6-7.5,43.5-10.5,66.3-9.8c39.7,1.2,78.7-8.4,119-2.9 c18.1,2.5,36.3,4.6,54.4,6.9c22.6,2.9,41.9,9.9,63.7,15.8c16.6,4.5,32.9,11.8,48.1,19.8c8.9,4.7,16.6,11.9,25.1,16.4 c9.9,5.2,20.8,7.1,30.7,13.1c73.7,44.9,114.4,120.4,126.3,204.5c6.6,46.6-3.2,89.9-11.8,135.2c-7.7,40.5-26.6,76.2-44.6,112.9 c-18.4,37.5-54.1,72.1-88.7,94.8c-18.5,12.2-38.1,22.8-57.1,34.1C589.1,659.6,546.2,679.5,544.6,675.9z M243.9,66.6 c-1.7-8.7-41.3,17.2-44.5,19.7c-13.3,10.3-27.6,18.4-40.5,29.1c-22.3,18.4-46.7,42.8-62.2,67.7c-10.5,16.9-21.9,35-28.8,53.7 c-6.7,18.3-10.2,37.4-16.3,55.7c-5.8,17.2-6.2,35.1-9,53.2c-3.4,21.8-6.7,43.1-4.8,65.2c1.6,18.1,6.9,36.9,13.5,53.8 c3,7.6,6.1,13.9,7.3,22c1.5,11.1,2.8,12.5,8.9,22.2c3.3,5.2,4.9,10.8,7.5,16.3c3.2,6.9,8.2,10.7,12.7,16.5 c5.2,6.6,8.7,14.3,14.2,20.8c6.2,7.3,13.9,12,20.7,18.5c9.3,9,19.2,17.3,30,24.3c7.5,4.8,15.3,9.1,22.9,13.7 c8,4.9,13.4,12.9,21.3,17.3c14.4,8.1,34.6,12.7,50.2,18.2c18.9,6.6,37,10.3,56.3,15.5c36.6,9.7,80.8,5,118,0.1 c34-4.5,67.7-14.5,101.4-22c20.1-4.5,36.2-17.1,54.6-25.5c18.1-8.2,35.3-17.1,52.2-27.6c30.6-19,56.1-48.7,76.6-78.1 c10.9-15.7,20.6-35.1,27.4-52.9c2.7-7,4.5-13.6,7.9-20.1c4.7-8.9,4.4-16.3,6.4-26.9c2.5-13.2,6.8-24.7,8.8-37.8 c0.9-5.5,2.3-10.3,2.9-15.8c1.1-11.3,3.3-20.6,5-31.6c2.6-16.7-0.2-38.9-2.9-55.3c-3-17.8-7.2-34.8-11.7-52.2 c-8.6-33.6-38.4-70.6-63.6-92.7c-13-11.4-28.2-20.3-43.5-29.1C626.6,93,608.2,82,590.3,76.2c-8.1-2.7-12.7-7.9-20.3-10.9 c-1.2-0.5-3.8,1.2-5.5,0.9c-5.5-1.2-12.5-5.4-17.6-7.6c-16.3-7-37.8-11.4-55.7-12.8c-19.6-1.5-39.1-4.5-58.7-5.3 c-21.7-0.8-42.1,0.9-63.6,2.8c-21,1.8-43.4,0.4-64.1,4.5C283.3,52.1,265.3,66.6,243.9,66.6z M477.7,521.6 c-27.1,4.2-53.3,8.2-80.9,6.4c-26.4-1.7-53.7-11.1-79.4-17.3c-25.1-6.1-52.3-13.3-74.3-27.1c-14.2-8.9-29.7-13.2-44.3-21.7 c-18.2-10.5-33.5-24.9-50-37.7c-12.9-9.9-47.6-22.6-40.5-42.6c10.2-28.9,38.3,1.3,52.2,9.4c18.5,10.9,34.5,25.5,52.3,37.4 c38.8,26,87.3,39.4,130.6,53.1c40.4,12.7,94.3,14.1,134.6,1.6c42-13,82.3-38.3,115.4-66.9c16.1-13.9,26-32.5,36.3-50.5 c3.4-5.9,9.5-19.7,19-19.2c9.3,0.4,6.4,8.2,9.1,14.9c3.8,9.6,7.6,10.1,4.5,21.3c-3.6,13-12.4,18-19.6,27.8 c-12.6,17-22.9,32.8-40.3,46.7c-19.7,15.7-42.8,31.1-65.4,41.6C531.9,501.2,477.8,522.2,477.7,521.6z M451,411.6 c-16.5-4.7-34.5-5.7-50.5-11.8c-16.7-6.4-34.7-19.4-48.5-31.2c-10.5-9-20.3-26.3-0.9-32.4c12.9-4.1,27.2,13.3,38.5,19.4 c14.9,8,28.3,13.8,44.5,18.5c17.8,5.1,28.5,6,40.6-10.5c19.4-26.4-14.2-65.5-27.4-87.8c-11-18.6-65.5-56.7-42.9-79.6 c14.5-14.7,24.6,2.5,33.2,13.6c11.8,15.1,25.3,29.4,36.4,44.9c18.8,26.3,42.7,65.5,42.8,99.2C517,385,479,409.5,451,411.6z  M666.2,222.9c12.4,10.9-16.3,35.7-25.5,41.7c-19.4,12.8-41.5,13.1-62.8,17.9c-18.7,4.2-41.2-9.9-56.6-19.3 c-12.4-7.5-44.6-29.6-16.8-44.6c14.4-7.8,32.8,15.1,45.7,20.4c13.6,5.6,41.7,8.4,56.5,3.5c17.5-5.7,21.4-24.3,35.2-32 c7.5-4.2,11.7-2.3,17.7,2.7C666.4,219.2,650.9,225.1,666.2,222.9z M194.7,255.9c9.2,3.8,18.1,12.8,28.2,13.7 c6.5,0.6,17.5-2.4,24.7-3.2c17.3-1.9,33.1-11.1,47.8-20.3c10.7-6.7,29.3-32.2,43.1-29.6c23.5,4.4,5.1,31.9-4.1,39.7 c-26,22-56.7,37.8-90.5,42.1c-16.1,2.1-29.7-2.2-44.4-9.1c-7.7-3.6-17.9-3.3-21-13.7C175.4,265.3,182.7,256.3,194.7,255.9z"/></svg>';

export default {
  // JavaScript to be fired on all pages
  init() {
    // Set up libraries to be used with jQuery
    jQueryBridget( 'masonry', Masonry, $ );
    ImagesLoaded.makeJQueryPlugin( $ );

    // Transition elements to enable/disable on resize
    transitionElements = [$siteNav];

    // Init Functions
    _initHoverPairs();
    _initMobileNav();
    _initImagesLoaded();
    _initMasonry();
    _initToTopButton();
    _initSmileys();
    _initMediumZoom();

    function _initHoverPairs() {
      $(document).on('mouseenter', '[data-hover-pair]', function(e) {
        var hoverPair = $(this).attr('data-hover-pair');
        $('[data-hover-pair="'+hoverPair+'"]').addClass('-hover');
      }).on('mouseleave', '[data-hover-pair]', function(e) {
        var hoverPair = $(this).attr('data-hover-pair');
        $('[data-hover-pair="'+hoverPair+'"]').removeClass('-hover');
      });
    }

    function _initMobileNav() {
      $navToggle.on('click', function() {
        if ($(this).is('.-active')) {
          _closeNav();
        } else {
          _openNav();
        }
      });
    }

    function _openNav() {
      $body.addClass('nav-open');
      $siteNav.addClass('-active');
      $navToggle.addClass('-active').html('close');
    }

    function _closeNav() {
      $body.removeClass('nav-open');
      $siteNav.removeClass('-active');
      $navToggle.removeClass('-active').html('menu');
    }

    function _initImagesLoaded() {
      $('figure.imagesloaded').each(function() {
        var $elem = $(this);
        $elem.imagesLoaded(function() {
          $elem.addClass('-loaded');
        });
      });
    }

    function _initMasonry() {
      if (!$('.masonry-grid').length && !$('.project-grid'.length)) {
        return;
      }

      $('.project-grid').css('opacity', 0);
      var $projectGrid = $('.project-grid').masonry(gridOptions);
      setTimeout(function() {
        $projectGrid.masonry('layout');
        $('.project-grid').css('opacity', 1);
      }, 500);

      var $imageGrid = $('.masonry-grid').masonry(gridOptions);

      $imageGrid.imagesLoaded().progress( function() {
        $imageGrid.masonry('layout');
      });
    }

    function _initToTopButton() {
      $toTop.on('click', function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      })
    }

    function _initSmileys() {
      smileyCount = 0;

      $smiley.on('click', function() {
        smileyDump = setInterval(newSmiley, 250);
      });

      function newSmiley() {
        // Quit after too many
        if (smileyCount == 100) {
          killSmiley();
          return;
        }

        if (smileyCount == 0) {
          $body.append(smileyMarkup);
          $newSmiley = $('.new-smiley');
        } else {
          $newSmiley = $newSmiley.clone().appendTo($body);
        }

        let newX = randomPercentage();
        let newY = randomPercentage();
        let newW = (Math.random() * (10 - 1) + 1) * 30;
        let newH = (Math.random() * (10 - 1) + 1) * 28;
        let newAngle = Math.floor(Math.random() * (360 - 1) + 1);
        let newColor = getRandomColor();

        $newSmiley.css({
          'top': newY,
          'left': newX,
          'width': newW + 'px',
          'height': newH + 'px',
          'transform': 'translate(-50%, -50%) rotate('+ newAngle +'deg)'
        }).find('.smiley-background').css('fill', newColor);

        smileyCount++;
      }

      function randomPercentage() {
        let percentage = Math.floor(Math.random() * (100 - 2)) + 1;
        return percentage + '%';
      }

      function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function killSmiley() {
        clearInterval(smileyDump);
        let smileys = $('.new-smiley');
        for (var i = 0; i < smileys.length; i++) {
          let $this = $(smileys[i]);
          setTimeout(function() {
            $this.remove();
            smileyCount--;
          }, i * 20);
        }
      }

      $document.on('click', '.new-smiley', killSmiley);
    }

    function _initMediumZoom() {
      mediumZoom('[data-zoomable]', {
        margin: 10
      });
    }

    // Disabling transitions on certain elements on resize
    function _disableTransitions() {
      $.each(transitionElements, function() {
        $(this).css('transition', 'none');
      });
    }

    function _enableTransitions() {
      $.each(transitionElements, function() {
        $(this).attr('style', '');
      });
    }

    function _resize() {
      // Disable transitions when resizing
      _disableTransitions();

      // Functions to run on resize end
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        // Re-enable transitions
        _enableTransitions();
      }, 250);
    }
    $(window).resize(_resize);

  },
  finalize() {
    // JavaScript to be fired on all pages, after page specific JS is fired
  },
};
