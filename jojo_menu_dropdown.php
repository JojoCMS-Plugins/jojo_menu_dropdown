<?php
/**
 * Jojo CMS - jojo_gcal - Google calendar integration
 *
 * Copyright 2008 Jojo CMS
 *
 * See the enclosed file license.txt for license information (LGPL). If you
 * did not receive this file, see http://www.fsf.org/copyleft/lgpl.html.
 *
 * @author  Harvey Kane <code@ragepank.com>
 * @license http://www.fsf.org/copyleft/lgpl.html GNU Lesser General Public License
 * @link    http://www.jojocms.org JojoCMS
 * @package empty_plugin
 */

class Jojo_Plugin_jojo_menu_dropdown extends Jojo_Plugin
{
    public static function menu_dropdown($content)
    {
        if (strpos($content, '[[menu_dropdown]]') === false) {
            return $content;
        }
        global $smarty;

        /* Find all dropdown menus */
        $smarty->assign('responsivetype', Jojo::getOption('responsive_menutype', 'select'));
        $smarty->assign('responsiveselect', (boolean)(Jojo::getOption('responsive_selectmenu', 'no')!='no'));
        $smarty->assign('responsiveselectsize', Jojo::getOption('responsive_selectmenu', 'no'));
        $smarty->assign('responsiveselecttext', Jojo::getOption('responsive_selectmenu_selecttext', ''));
        $smarty->assign('responsiveselectsubnav', (boolean)(Jojo::getOption('responsive_selectmenu_subnav', 'no')=='yes'));
        $smarty->assign('responsiveselectsubnavtext', Jojo::getOption('responsive_selectmenu_subnavselecttext', ''));
        $html = $smarty->fetch('jojo_menu_dropdown.tpl');
        $content = str_replace("[[menu_dropdown]]", $html, $content);

        return $content;
    }
}
