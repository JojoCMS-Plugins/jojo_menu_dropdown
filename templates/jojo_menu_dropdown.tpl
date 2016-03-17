{if $responsivetype!='select' && $responsiveselect}
    <a id="page-menu-toggle" class="menu-toggle btn btn-default{if $responsiveselectsize=='phone'} visible-xs{elseif $responsiveselectsize=='tablet'} visible-xs visible-sm{elseif $responsiveselectsize=='laptop'} hidden-lg{/if}" href="#"><span class="glyphicon glyphicon-align-justify"></span></a>
   <div id="menu-mobile" class="{$responsivetype} {if $responsiveselectsize=='phone'}visible-xs{elseif $responsiveselectsize=='tablet'}hidden-md{/if}">
        <a class="menu-toggle btn btn-default"><span class="close">&times;</span></a>
        <ul>
            {foreach $mainnav k n mainnav}<li id="itemNo{$k}" class="{if $.foreach.mainnav.last}last {elseif $.foreach.mainnav.first}first {/if}{if $n.pageid==$pageid}current {/if}{if $n.subnav}hassubnav {/if}{if $n.subnav && $n.selected}active{/if}" ><a href="{$n.url}" title="{$n.title}"{if $n.pg_followto=='no'} rel="nofollow"{/if}>{$n.label}<span></span></a>{if $n.subnav }<a href="#" class="subnavtoggle"></a>
                <ul{if in_array($n.pageid, $selectedpages)} class="active"{/if}>
                    {foreach $n.subnav sk s subnav}<li class="{if $s.selected}current {/if}{if $.foreach.subnav.last}last {/if}{if $s.subnav}hassubnav{/if}"><a href="{$s.url}" title="{$s.title}">{$s.label}<span></span></a>{if $s.subnav }<a href="#" class="subnavtoggle"></a>
                        <ul>
                            {foreach $s.subnav tk t subsubnav}<li class="{if $t.selected}current {/if}{if $.foreach.subsubnav.last}last {/if}{if $t.subnav}hassubnav{/if}"><a href="{$t.url}" title="{$t.title}">{$t.label}<span></span></a>{if $t.subnav }<a href="#" class="subnavtoggle"></a>
                                <ul{if in_array($s.pageid, $selectedpages)} class="active"{/if}>
                                    {foreach $t.subnav f}<li{if $.foreach.default.last} class="last"{/if}><a href="{$f.url}" title="{$f.title}">{$f.label}</a></li>
                                    {/foreach}
                                </ul>
                            {/if}</li>
                            {/foreach}
                        </ul>
                    {/if}</li>
                    {/foreach}
                </ul>
            {/if}</li>
            {/foreach}
        </ul>
    </div>
{/if}{if $responsiveselectsize!='all'}
    <div id="menu" class="{if $responsiveselect}{if $responsiveselectsize=='phone'}hidden-xs {elseif $responsiveselectsize=='tablet'} hidden-xs hidden-sm{elseif $responsiveselectsize=='laptop'} visible-lg{/if}{/if}{if $OPTIONS.responsive_menulayout=='vertical'} vertical{/if}">
        <ul>
            {foreach $mainnav k n mainnav}<li id="itemNo{$k}" class="{if $.foreach.mainnav.last}last {elseif $.foreach.mainnav.first}first {/if}{if in_array($n.pageid, $selectedpages)}current {/if}{if $n.subnav}hassubnav{/if}" ><a href="{$n.url}" title="{$n.title}"{if $n.pg_followto=='no'} rel="nofollow"{/if}>{$n.label}<span></span></a>
                {if $n.subnav }<ul{if in_array($n.pageid, $selectedpages)} class="active"{/if}>
                    {foreach $n.subnav sk s subnav}<li class="{if $s.pageid==$pageid}current {/if}{if $.foreach.subnav.last}last {/if}{if $s.subnav}hassubnav{/if}"><a href="{$s.url}" title="{$s.title}">{$s.label}<span></span></a>{if $s.subnav }
                        <ul>
                            {foreach $s.subnav tk t subsubnav}<li class="{if $t.pageid==$pageid}current {/if}{if $.foreach.subsubnav.last}last {/if}{if $t.subnav}hassubnav{/if}"><a href="{$t.url}" title="{$t.title}">{$t.label}<span></span></a>{if $t.subnav }
                                <ul{if in_array($s.pageid, $selectedpages)} class="active"{/if}>
                                    {foreach $t.subnav f}<li{if $.foreach.default.last} class="last"{/if}><a href="{$f.url}" title="{$f.title}">{$f.label}</a></li>
                                    {/foreach}
                                </ul>
                            {/if}</li>
                            {/foreach}
                        </ul>
                    {/if}</li>
                    {/foreach}
                </ul>
            {/if}</li>
            {/foreach}
        </ul>
    </div>
{/if}{if $responsivetype=='select' && $responsiveselect}
    <div id="selectmenu">
        <select class="form-control {if $responsiveselectsize=='phone'}visible-xs{elseif $responsiveselectsize=='tablet'} visible-xs visible-sm{elseif $responsiveselectsize=='laptop'} hidden-lg{/if}" onchange="window.location.href = $(this).val();">
            {if $responsiveselecttext && $pageid==$home}<option value="">{$responsiveselecttext}</option>{/if}
            {foreach $mainnav n}<option value="{$n.url}"{if $n.pageid==$pageid || ($n.pageid==$pageid && $n.subnav)} selected="selected"{/if}>{$n.label}</option>{if !$responsiveselectsubnav && $n.subnav}
                {foreach $n.subnav s}<option value="{$s.url}" class="subnav"{if $s.pageid==$pageid} selected="selected"{/if}>{$s.label}</option>
                {/foreach}
            {elseif $n.subnav && $n.pageid==$pageid}{$selectsubnav=$n.subnav}{/if}
            {/foreach}
        </select>
        {if $responsiveselect && $selectsubnav}<select class="subnav form-control {if $responsiveselectsize=='phone'}visible-xs{elseif $responsiveselectsize=='tablet'} visible-xs visible-sm{elseif $responsiveselectsize=='laptop'} hidden-lg{/if}" onchange="window.location.href = $(this).val();">
            {if $responsiveselectsubnavtext}<option value="">{$responsiveselectsubnavtext}</option>{/if}
            {foreach $selectsubnav n}<option value="{$n.url}"{if $n.pageid==$pageid} selected="selected"{/if}>{$n.label}</option>{if $n.subnav}
                {foreach $n.subnav s}<option value="{$s.url}" class="subnav"{if $s.pageid==$pageid} selected="selected"{/if}>{$s.label}</option>
                {/foreach}
            {/if}
            {/foreach}
        </select>
        {/if}
    </div>
{/if}
