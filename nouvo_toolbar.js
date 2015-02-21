(function($) {
  var $open_nouvo_btn = false,
      $open_nouvo_sub = false;

  $(document).ready(function() {

    $('#nouvo-toolbar .nouvo-btn-parent > a').click(function(e) {
      e.preventDefault();
      prevent_event_bubbling(e);

      var $clicked_nouvo_btn = $(this).parent();
      $open_nouvo_btn = toggle_nav($clicked_nouvo_btn, $open_nouvo_btn);
    });

    $('#nouvo-toolbar .nouvo-parent > a').click(function(e) {
      e.preventDefault();
      prevent_event_bubbling(e);

      var $clicked_nouvo_sub = $(this).parent();
      $clicked_nouvo_sub.next('ul').height('100px');
      toggle_nav($clicked_nouvo_sub, $open_nouvo_sub, function($clicked, $open) {
        if ($open) {
          $open.find('> ul').height('0');
          if ($open.get(0) !== $clicked.get(0)) {
            calc_menu_height($clicked);
          }
        } else {
          calc_menu_height($clicked);
        }
      }, function($clicked, $open) {
        $open_nouvo_sub = $open;
      });

    });

    $('#nouvo-toolbar .nouvo-2nd li:not(.nouvo-parent) > a').click(function(e) {
      close_nouvo_btn();
    });

    $(document).click(function(e) {
      if (!$(e.target).closest('#nouvo-toolbar').length) {
        close_nouvo_btn();
      }
    });
  });

  function calc_menu_height($parent) {
    var $ul = $parent.find('> ul');

    var height = 0;
    $ul.find('> li').each(function() {
      height += $(this).height();
    })
    $ul.height(height);
  }

  /**
   * Toggle open and closed class on a menu. The open variable is returned so
   * that the global variable can be set.
   */
  function toggle_nav($clicked, $open, onBefore, onAfter) {
    if (typeof(onBefore) == 'function') {
      onBefore($clicked, $open);
    }
    if ($open) {
      if ($open.get(0) !== $clicked.get(0)) {
        $open.removeClass('open');
        $clicked.removeClass('close').addClass('open');
        $open = $clicked;
      } else {
        $open.removeClass('open').addClass('close');
        $open = false;
      }
    } else {
      $clicked.removeClass('close').addClass('open');
      $open = $clicked;
    }
    if (typeof(onAfter) == 'function') {
      onAfter($clicked, $open);
    }
    return $open;
  }

  /*
   * The only way I can figure to stop the menu items from opening the overlay
   * on click is to stop the event from bubbling to the overlay module. Hate to
   * do this as some js might be beneficial, but in our case, we don't want to
   * open the link in the overlay for nav links that should open sub menus.
   */
  function prevent_event_bubbling(e) {
    if ($('html').hasClass('overlay-open')) {
      e.stopPropagation();
    }
  }

  function close_nouvo_btn() {
    if ($open_nouvo_btn) {
      $open_nouvo_btn.removeClass('open').addClass('close');
      $open_nouvo_btn = false;
    }
  }
})(jQuery);