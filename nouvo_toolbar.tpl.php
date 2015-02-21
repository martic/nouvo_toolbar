<?php

/**
 * @file
 * Default template for nouvo toolbar.
 *
 * Available variables:
 * - $nouvo_toolbar['nouvo_toolbar_menu']: Top level management menu links.
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_nouvo_toolbar()
 *
 * @ingroup themeable
 */
?>
<div id="nouvo-toolbar" class="<?php print $classes; ?>">
  <?php print render($nouvo_toolbar['nouvo_toolbar_menu']); ?>
</div>