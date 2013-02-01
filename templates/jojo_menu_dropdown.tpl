    {* Recursive template so that the nav is not limited to a hard coded level. Untested will only work with dwoo 1.1.1 and up *}
    {*{template menu data navLevel=0 navCount=0}
        <ul>
        {foreach from=$data item=entry}
            {$class = ''}
            {if $navLevel=0}
                {$class .= 'itemNo'.$navCount}
            {else if $.foreach.default.last}
                {$class .= 'last'}
            {/if}
            <li{if $entry.selected} id="current"{/if} {if strlen($class) > 0}class="{$class}"{/if} >
                <a {if $navLevel > 0}class="menu-sub-link" {/if}href="{$entry.url}" title="{$entry.title}"{if $entry.pg_followto=='no'} rel="nofollow"{/if}>{$entry.label}</a>
            {if $entry.subnav }
                {menu $entry.subnav $navLevel++}
            {/if}
            </li>
            <!-- {$navCount++} -->
        {/foreach}
        </ul>
    {/template}*}
    <div id="menu">
        {*{menu $mainnav 0}*}

        <ul id="nav-level1">{$navCount = 0}
            {foreach $mainnav k n mainnav}<li class="itemNo{$navCount}{if $.foreach.mainnav.last} last{elseif $.foreach.mainnav.first} first{/if}{if $n.selected} current{/if}" ><a href="{$n.url}" title="{$n.title}"{if $n.pg_followto=='no'} rel="nofollow"{/if}>{$n.label}{if $n.subnav}<span class="hassubnav"></span>{/if}</a>
                {if $n.subnav }<ul class="subnav-level1">
                    {foreach $n.subnav sk s subnav}<li class="{if $s.selected}current {/if}{if $.foreach.subnav.last}last {/if}"><a class="menu-sub-link" href="{$s.url}" title="{$s.title}">{$s.label}</a>{if $s.subnav }
                        <ul>
                            {foreach $s.subnav t}<li{if $.foreach.default.last} class="last"{/if}><a class="menu-sub-link" href="{$t.url}" title="{$t.title}">{$t.label}</a>{if $t.subnav }
                                <ul>
                                    {foreach $t.subnav f}<li{if $.foreach.default.last} class="last"{/if}><a class="menu-sub-link" href="{$f.url}" title="{$f.title}">{$f.label}</a></li>
                                    {/foreach}
                                </ul>
                            {/if}</li>
                            {/foreach}
                        </ul>
                    {/if}</li>
                    {/foreach}
                </ul>
            {/if}</li>
            <!-- {$navCount++} -->
            {/foreach}
        </ul>

    </div>

    <script type="text/javascript">
        /*<![CDATA[*/
        $("document").ready(function() {ldelim}
            $("#menu").initMenu();
        {rdelim});
        /*]]>*/
    </script>
