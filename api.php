<?php
/**
 *                    Jojo CMS
 *                ================
 *
 * Copyright 2012 Antony Spalding <antony@gardyneholt.co.nz>
 *
 * See the enclosed file license.txt for license information (LGPL). If you
 * did not receive this file, see http://www.fsf.org/copyleft/lgpl.html.
 *
 * @author  Harvey Kane <code@ragepank.com>
 * @license http://www.fsf.org/copyleft/lgpl.html GNU Lesser General Public License
 * @link    http://www.jojocms.org JojoCMS
 */

Jojo::addFilter('output', 'menu_dropdown', 'jojo_menu_dropdown');

$_options[] = array(
    'id'          => 'responsive_menulayout',
    'category'    => 'Navigation',
    'label'       => 'Menu Layout',
    'description' => 'Non-mobile menu layout is horizontal or vertically stacked',
    'type'        => 'radio',
    'default'     => 'horizontal',
    'options'     => 'horizontal,vertical',
);

$_options[] = array(
    'id'          => 'responsive_selectmenu',
    'category'    => 'Navigation',
    'label'       => 'Responsive Menu Switch',
    'description' => 'Convert menu to a mobile-frendly version at phone or tablet screen sizes',
    'type'        => 'radio',
    'default'     => 'no',
    'options'     => 'no,laptop,tablet,phone,all',
);

$_options[] = array(
    'id'          => 'responsive_menutype',
    'category'    => 'Navigation',
    'label'       => 'Responsive Menu Type',
    'description' => 'Menu type to use for mobile.',
    'type'        => 'radio',
    'default'     => 'select',
    'options'     => 'select,dropdown,sideslide',
);

$_options[] = array(
    'id'          => 'responsive_selectmenu_subnav',
    'category'    => 'Navigation',
    'label'       => 'Responsive Select Subnav',
    'description' => 'Split Select menu into seperate dropdowns for main level and subnav (better for large menus)',
    'type'        => 'radio',
    'default'     => 'no',
    'options'     => 'no,yes',
);

$_options[] = array(
    'id'          => 'responsive_selectmenu_selecttext',
    'category'    => 'Navigation',
    'label'       => 'Responsive Select Text',
    'description' => 'Text to display for first menu item (eg Menu, Navigation), leave blank to disable',
    'type'        => 'text',
    'default'     => '',
    'options'     => '',
);

$_options[] = array(
    'id'          => 'responsive_selectmenu_subnavselecttext',
    'category'    => 'Navigation',
    'label'       => 'Responsive Select Subnav Text',
    'description' => 'Text to display for first submenu item (eg Choose One, Select), leave blank to disable',
    'type'        => 'text',
    'default'     => '',
    'options'     => '',
);

