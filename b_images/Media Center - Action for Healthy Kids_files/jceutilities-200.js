/*
 * JCE Utilities 2.0.0
 *
 * Copyright (c) 2007 - 2008 Ryan Demmer (www.joomlacontenteditor.net)
 * Licensed under the GPL (http://www.gnu.org/licenses/licenses.html#GPL)license.
 * JCE Tooltips based on Mootools Tips plugin - http://www.mootools.net
 * JCE Lightbox plugin based on Slimbox - http://www.digitalia.be/software/slimbox - and Thickbox - http://jquery.com/demo/thickbox/
 */
jQuery.noConflict();(function($){$.jceUtilities=function(options){return $.jceUtilities.init(options)};$.jceUtilities.init=function(options){this.options=$.extend({popup:{legacy:0,convert:0,overlay:1,overlayopacity:0.8,overlaycolor:'#000000',resize:1,icons:1,fadespeed:500,scalespeed:500,template:'standard',templatecustom:'',templatepath:'plugins/system/jceutilities/tmpl'},tooltip:{classname:'tooltip',opacity:1,speed:150,position:'br',offsets:{'x':16,'y':16}},pngfix:1,wmode:0,imgpath:'plugins/system/jceutilities/img'},options);if(this.options.popup.convert>0){$('a').each(function(){$.jceUtilities.convertType(this)})}else{$.jceUtilities.tooltip.init(this.options.tooltip);$.jceUtilities.popup.init(this.options.popup)}if(this.options.pngfix==1&&$.browser.ie&&$.browser.version<7){this.pngFix()}if(this.options.wmode==1){this.wmode()}};$.jceUtilities.cleanupEventStr=function(s){s=""+s;s=s.replace('function anonymous()\n{\n','');s=s.replace('\n}','');s=s.replace(/^return true;/gi,'');return s};$.jceUtilities.parseQuery=function(query){var params={},kv,k,v;if(!query){return params}var pairs=query.split(/[;&]/);for(var i=0;i<pairs.length;i++){kv=pairs[i].split('=');if(!kv||kv.length!=2){continue}k=unescape(kv[0]);v=unescape(kv[1]);v=v.replace(/\+/g,' ');params[k]=v}return params};$.jceUtilities.convertType=function(link){if($.jceUtilities.options.popup.convert>0){if(/.(jpg|jpeg|png|gif|bmp|tif)$/i.test(link.href)){var linkclass='';var rel=link.rel;switch($.jceUtilities.options.popup.convert){case 1:if(!rel){rel='lightbox'}else{rel='lightbox['+rel+']'}break;case 2:linkclass='thickbox';if(!rel){rel=''}break;case 3:if(!rel){rel='rokzoom'}else{rel='rokzoom['+rel+']'}link.setAttribute('rel',rel);break}link.setAttribute('rel',rel);link.className=link.className.replace(/jce(box|lightbox|popup)/gi,linkclass);if(link.className===''){link.removeAttribute('class')}if(link.rel===''){link.removeAttribute('rel')}}}return link};$.jceUtilities.pngFix=function(){var s,bg;$('img[@src*=".png"]',document.body).each(function(){this.css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+this.src+'\', sizingMethod=\'\')');this.src=$.jceUtilities.getSite()+'plugins/system/jceutilities/img/blank.gif'});$('*',document.body).each(function(){s=$(this).css('background-image');if(s&&/\.(png)/i.test(s)){bg=/url\("(.*)"\)/.exec(s)[1];$(this).css('background-image','none');$(this).css('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg+"',sizingMethod='scale')")}})};$.jceUtilities.wmode=function(){$('object').not('#jcepopup-object').each(function(){if(/^(clsid:d27cdb6e-ae6d-11cf-96b8-444553540000)$/i.test(this.classid)){if(!this.wmode||this.wmode.toLowerCase()=='window'){this.wmode='opaque';if(typeof this.outerHTML=='undefined'){$(this).replaceWith($(this).clone(true))}else{this.outerHTML=this.outerHTML}}}});$('embed[type="application/x-shockwave-flash"]').each(function(){var wm=$(this).attr('wmode');if(!wm||wm.toLowerCase()=='window'){$(this).attr('wmode','opaque');if(typeof this.outerHTML=='undefined'){$(this).replaceWith($(this).clone(true))}else{this.outerHTML=this.outerHTML}}})};$.jceUtilities.getSite=function(){var src;$('script[@src*="plugins/system/jceutilities/js/jceutilities"]').each(function(){src=this.src});return src.substring(0,src.lastIndexOf('plugins/system/jceutilities/js'))||''};$.jceUtilities.tooltip={init:function(options){var t=this;this.options=$.extend({},options);$('.jcetooltip, .jce_tooltip').each(function(){$(this).bind('mouseover',function(){t.show(this)});$(this).bind('mousemove',function(e){t.locate(e)});$(this).bind('mouseout',function(){t.hide(this)}).bind('blur',function(){t.hide(this)})})},show:function(el){var d=document,text=el.title||'',title='';if(/::/.test(text)){var parts=text.split('::');title=$.trim(parts[0]);text=$.trim(parts[1])}this.tip=d.createElement('div');this.tip.title=el.title;$(el).attr('title','');if(title){$(this.tip).append('<h4>'+title+'</h4>')}$(this.tip).append('<p>'+text+'</p>');$(this.tip).addClass(this.options.classname).css('position','absolute').appendTo('body').hide();$(this.tip).animate({'opacity':this.options.opacity},this.options.speed).show();this.exists=true},locate:function(e){if(this.exists){var o=this.options.offsets;var page={'x':e.clientX+$(window).scrollLeft(),'y':e.clientY+$(window).scrollTop()};var tip={'x':this.tip.offsetWidth,'y':this.tip.offsetHeight};var pos={'x':e.clientX+o.x,'y':e.clientY+o.y};switch(this.options.position){case'tl':pos.x=(page.x-tip.x)-o.x;pos.y=(page.y-tip.y)-o.y;break;case'tr':pos.x=page.x+o.x;pos.y=(page.y-tip.y)-o.y;break;case'tc':pos.x=(page.x-Math.round((tip.x/2)))+o.x;pos.y=(page.y-tip.y)-o.y;break;case'bl':pos.x=(page.x-tip.x)-o.x;pos.y=(page.y+tip.y)-o.y;break;case'br':pos.x=page.x+o.x;pos.y=page.y+o.y;break;case'bc':pos.x=(page.x-Math.round((tip.x/2)))+o.x;pos.y=(page.y+tip.y)-o.y;break}$(this.tip).css({top:pos.y+'px',left:pos.x+'px'})}},hide:function(el){if(this.exists){$(el).attr('title',this.tip.title);$(this.tip).fadeOut(this.options.speed).remove()}}};$.jceUtilities.popup={popups:[],init:function(options){var t=this;this.options=$.extend({},options);if(this.options.legacy==1){var op='index2.php?option=com_jce&task=popup';var mp='mosce/jscripts/tiny_mce/popupImage.php';$('a[onclick.contains('+op+')][onclick.contains('+mp+')][href.contains('+op+')]').each(function(){$.jceUtilities.convertType(this)})}$('a.jcebox, a.jcelightbox, a.jcepopup').each(function(){if(!$(this).children()){return}if(t.options.icons==1){t._zoom(this)}t.popups.push(this);$(this).click(function(){return t._start(this)})});var tmpl=t.options.template=='custom'?t.options.templatecustom:t.options.template;$.get($.jceUtilities.getSite()+t.options.templatepath+'/'+tmpl+'/tmpl.html',function(data){t.template=data.replace(/^(<!--[.+]-->)$/,'')})},_ie6:function(){return $.browser.msie&&$.browser.version<7},_png:function(el){var s;if(el.src){s=el.src;if(/\.(png)/i.test(s)){$(el).attr('src',$.jceUtilities.getSite()+'plugins/system/jceutilities/img/blank.gif').css('filter','progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\''+s+'\', sizingMethod=\'\')')}}else{s=$(el).css('background-image');if(/\.(png)/i.test(s)){var bg=/url\("(.*)"\)/.exec(s)[1];$(el).css('background-image','none');$(el).css('filter',"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+bg+"',sizingMethod='scale')")}}},_zoom:function(el){var h,w,mt,ml,mr,iw,ih,t=this;$(el).each(function(){if(this.firstChild.nodeName.toLowerCase()=='img'){var child=this.firstChild;var zoom=document.createElement('img');$(window).bind('load',function(){w=parseInt($(child).width())||parseInt($(child).css('width'));h=parseInt($(child).height())||parseInt($(child).css('height'));mt=parseInt($(child).css('marginTop'))||0;ml=parseInt($(child).css('marginLeft'))||0;mr=parseInt($(child).css('marginRight'))||0;$(zoom).attr({'src':$.jceUtilities.getSite()+$.jceUtilities.options.imgpath+'/zoom-img.png'}).addClass('zoomImg').insertAfter($(child));iw=parseInt($(zoom).css('width'))||20;ih=parseInt($(zoom).css('height'))||20;if($.browser.opera){$(child).parent('a').css('float',$(child).css('float'))}$(zoom).css({'top':h-(ih-mt),'cursor':'pointer','float':$(child).css('float')});switch($(child).css('float')){case'left':$(zoom).css({'right':mr+iw,'margin-right':-(mr+iw)});break;case'right':var lft=w+ml;var mlft=-(w+ml);if($.browser.msie){lft=(w*2)-(ml+mr);mlft=-(w+ml+iw)}$(zoom).css({'left':lft,'margin-left':mlft});break;default:$(zoom).css({'top':-mt,'right':mr+iw,'margin-right':-(mr-iw)});break}if(t._ie6()&&$.jceUtilities.options.pngfix==1){t._png(zoom)}})}else{zoom=document.createElement('img');$(zoom).attr({src:$.jceUtilities.getSite()+$.jceUtilities.options.imgpath+'/zoom-link.png'}).addClass('zoomLink').appendTo(el);if(t._ie6()&&$.jceUtilities.options.pngfix==1){t._png(zoom)}}})},open:function(s,t,d){var link={};if(typeof s=='object'){link={'href':s.href||s.src,'title':s.title||'','type':s.type||''}}else{link={'href':s,'title':t||'','type':d||''}}return this._start(link)},_start:function(link){var d=document,t=this,n=0,items=[];if(this.options.overlay==1){this.overlay=d.createElement('div');$(this.overlay).attr('id','jcepopup-overlay').appendTo('body').css({opacity:'0',cursor:'pointer',backgroundColor:this.options.overlaycolor,width:$(window).width()}).click(function(){t.close()})}$('body').append(this.template);$.each(['container','content','loader','closelink','info','caption','nav','next','prev','numbers'],function(i,s){t[s]=$('#jcepopup-'+s).hide()});if(this.closelink){this.closelink.click(function(){t.close()})}if(this.next){this.next.click(function(){t._next()})}if(this.prev){this.prev.click(function(){t._previous()})}if(this._ie6()){this._png(this.container);$('*',this.container).not('#jcepopup-content').each(function(){t._png(this)})}if(!link.rel){items.push(link)}else{var i=0;$.each(this.popups,function(){if(this.rel==link.rel){items.push(this);if(this.href==link.href){n=i}i++}})}return this._open(items,n)},_open:function(items,n){this.items=items;this._position();this._bind(true);this.container.css('top',$(window).scrollTop()+50).show();if(this.options.overlay==1&&$(this.overlay)){$(this.overlay).fadeTo(this.options.fadespeed,this.options.overlayopacity)}this._position();return this._change(n)},_position:function(){if(this.options.overlay==1&&$(this.overlay)){$(this.overlay).css({'top':$(window).scrollTop(),'height':$(window).height()})}},_bind:function(open){var t=this;if(this._ie6()){$('select').each(function(){if(open){this.tmpStyle=this.style.visibility}this.style.visibility=open?'hidden':this.tmpStyle})}if(open){$(window).bind('scroll',function(){t._position()});$(window).bind('resize',function(){t._position()});$(document).bind('keydown',function(event){t._listener(event)})}else{$(window).unbind('scroll');$(window).unbind('resize');$(document).unbind('keydown')}},_listener:function(event){switch(event.keyCode){case 27:case 88:case 67:this.close();break;case 37:case 80:this.previous();break;case 39:case 78:this.next()}},_media:function(c){var ci,cb,mt;switch(c){case'director':case'application/x-director':ci='166b1bca-3f9c-11cf-8075-444553540000';cb='http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0';mt='application/x-director';break;case'windowsmedia':case'mplayer':ci='6bf52a52-394a-11d3-b153-00c04f79faa6';cb='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701';mt='application/x-mplayer2';break;case'quicktime':case'video/quicktime':ci='02bf25d5-8c17-4b23-bc80-d3488abddc6b';cb='http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0';mt='video/quicktime';break;case'real':case'realaudio':case'audio/x-pn-realaudio-plugin':ci='cfcdaa03-8be4-11cf-b84b-0020afbbccfa';cb='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0';mt='audio/x-pn-realaudio-plugin';break;case'divx':case'video/divx':ci='67dabfbf-d0ab-41fa-9c46-cc0f21721616';cb='http://go.divx.com/plugin/DivXBrowserPlugin.cab';mt='video/divx';break;default:case'flash':case'application/x-shockwave-flash':ci='d27cdb6e-ae6d-11cf-96b8-444553540000';cb='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0';mt='application/x-shockwave-flash';break}return{'classid':ci,'codebase':cb,'mediatype':mt}},_params:function(s){var p={},x=s.split(';');$.each(x,function(){v=this.match(/(.+)\[(.*?)\]/);p[v[1]]=v[2]});return p},_next:function(){return this._queue(this.index+1)},_previous:function(){return this._queue(this.index-1)},_queue:function(n){var fs=this.options.fadespeed;if(this.closelink){this.closelink.hide()}if($.browser.opera||this._ie6()){if(this.info){this.info.hide()}this.content.hide();return this._change(n)}else{var t=this;if(this.info){this.info.fadeOut(fs,function(){t.content.fadeOut(fs,function(){return t._change(n)})})}else{t.content.fadeOut(fs,function(){return t._change(n)})}}},_change:function(n){var t=this,p={};if(n<0||n>=this.items.length){return false}this.index=n;this.active={};if(this.loader){this.loader.show()}this.content.empty();if(this.object){this.object=null}$.extend(this.active,{'src':this.items[n].href,'title':this.items[n].title,'type':this.items[n].type,'width':300,'height':300});if(/(youtube|google|metacafe)(.+)\/(watch|videoplay)(.+)/i.test(this.active.src)){this.active.type='flash'}if(/\.(jpg|jpeg|png|gif|bmp|tif)$/i.test(this.active.src)){this.active.type='image';this.img=new Image();this.img.onload=function(){return t._setup()};this.img.src=this.active.src;}else if(/(flash|director|shockwave|mplayer|windowsmedia|quicktime|realaudio|real|divx)/i.test(this.active.type)){if(/(\[.*\])/.test(this.active.title)){p=this._params(this.active.title)}else{p.title=this.active.title}p.src=this.active.src;var base=/:\/\//.test(p.src)?'':$.jceUtilities.getSite();this.object='';if(/youtube(.+)\/watch\?v=(.+)/.test(p.src)){p.src=p.src.replace(/watch\?v=/,'v/');if(!p.width){p.width=425}if(!p.height){p.height=344}}if(/google(.+)\/videoplay\?docid=(.+)/.test(p.src)){p.src=p.src.replace(/videoplay/,'googleplayer.swf');if(!p.width){p.width=425}if(!p.height){p.height=326}}if(/metacafe(.+)\/watch\/(.+)/.test(p.src)){var s=$.trim(p.src);if(!/\.swf/i.test(s)){if(s.charAt(s.length-1)=='/'){s=s.substring(0,s.length-1)}s=s+'.swf'}p.src=s.replace(/watch/i,'fplayer');if(!p.width){p.width=400}if(!p.height){p.height=345}}this.active.title=p.title||'';this.active.width=parseInt(p.width)||300;this.active.height=parseInt(p.height)||300;var mt=this._media(this.active.type);if(this.active.type=='flash'){p.wmode='transparent';p.base=base;if($.browser.msie){p.movie=p.src;delete p.src}}if(/(mplayer|windowsmedia)/i.test(this.active.type)){p.baseurl=base;if($.browser.msie){p.url=p.src;delete p.src}}this.object+='<object id="jcepopup-object" codebase="'+mt.codebase+'"';if($.browser.msie){this.object+='classid="clsid:'+mt.classid+'"';for(n in p){if(p[n]!==''){if(/(id|name|width|height|style)$/.test(n)){t.object+=n+'="'+p[n]+'"'}}}}this.object+='>';if($.browser.msie){for(n in p){if(p[n]!==''){if(!/(id|name|width|height|style)$/.test(n)){t.object+='<param name="'+n+'" value="'+p[n]+'">'}}}}else{this.object+='<object type="'+mt.mediatype+'" data="'+p.src+'"';for(n in p){if(p[n]!==''){t.object+=n+'="'+p[n]+'"'}}this.object+='></object>'}this.object+='</object>';this._setup();}else{var src=this.active.src;var q=$.jceUtilities.parseQuery(src.replace(/^[^\?]+\??/,'').replace(/&amp;/gi,'&'));if(/(\[.*\])/.test(this.active.title)){p=this._params(this.active.title)}else{p.title=this.active.title}this.active.title=p.title;this.active.src=src.replace(/(&|\?)(width|height|bw|bh)=[0-9]+/gi,'');this.active.width=parseInt(q.width)||parseInt(q.bw)||parseInt(p.width)||300;this.active.height=parseInt(q.height)||parseInt(q.bh)||parseInt(p.height)||300;if(!/:\/\//.test(this.active.src)||this.active.src.indexOf($.jceUtilities.getSite())!=-1){this.active.type='ajax';this.ajax=document.createElement('div');$(this.ajax).attr({id:'jcepopup-ajax'}).css({width:t.active.width,height:t.active.height}).appendTo(this.content);$.get(this.active.src,function(data){var html=data,re=/<body[^>]*>([\s\S]*?)<\/body>/;if(re.test(data)){html=re.exec(data)[1]}$(t.ajax).html(html);if(t.loader){t.loader.hide()}return t._setup()})}else{this.active.type='iframe';this.iframe=document.createElement('iframe');$(this.iframe).attr({id:'jcepopup-iframe',frameBorder:0,onload:function(){return t._setup()}}).css({width:t.active.width,height:t.active.height}).appendTo(this.content).attr('src',t.active.src)}}return false},_setup:function(){var t=this,w,h;if(this.active.type=='image'){w=this.img.width;h=this.img.height;if(this.options.resize==1){var x=Math.round($(window).width()-150);var y=Math.round($(window).height()-200);if(w>x){h=h*(x/w);w=x;if(h>y){w=w*(y/h);h=y}}else if(h>y){w=w*(y/h);h=y;if(w>x){h=h*(x/w);w=x}}}w=Math.round(w);h=Math.round(h);this.content.width(w).height(h).html('<img src="'+this.active.src+'" title="'+this.active.title+'" width="'+w+'" height="'+h+'" />')}else{w=this.active.width;h=this.active.height;if(this.active.type=='iframe'||this.active.type=='ajax'){this.content.width(w).height(h);}else{this.content.width(w).height(h)}}if(this.caption){var title=this.active.title||'',caption='';if(/:\/\//.test(title)){title='<a href="'+title+'" target="_blank">'+title+'</a>'}caption='<p>'+title+'</p>';if(/::/.test(title)){var parts=title.split('::');caption='<h4>'+parts[0]+'</h4><p>'+parts[1]+'</p>'}this.caption.html(caption).show()}if(this.nav){var html='',len=this.items.length;if(len>1){for(var i=0;i<len;i++){var n=i+1;if(this.index!=i){html+='<a href="javascript:;">'}html+=n;if(this.index!=i){html+='</a>'}html+=(n==len)?'':' | '}if(this.index>0){if(this.prev){this.prev.show()}}if(this.index!=len-1){if(this.next){this.next.show()}}}if(this.numbers){this.numbers.html(html).children('a').each(function(){$(this).click(function(){t._queue(parseInt($(this).text())-1)})});this.numbers.show()}this.nav.show()}this._animate()},_animate:function(){var t=this,ss=this.options.scalespeed,fs=this.options.fadespeed;t.container.animate({height:t.content.outerHeight()+t.info.outerHeight()},ss,function(){t.container.animate({width:t.content.outerWidth(),marginLeft:-t.content.outerWidth()/2},ss,function(){t.content.fadeIn(fs,function(){if(t.info){if($.browser.opera||t._ie6()){t.info.show()}else{t.info.fadeIn(fs)}if(!/(image|iframe|ajax)/.test(t.active.type)&&t.object){t.content.append(t.object)}}else{if(!/(image|iframe|ajax)/.test(t.active.type)&&t.object){t.content.append(t.object)}}if(t.closelink){t.closelink.show()}})})})},close:function(){var fs=this.options.fadespeed;this._bind();if(this.img){this.img.onload=null;this.img=null}if(this.closelink){this.closelink.hide()}this.content.empty();if(this.info){this.info.hide()}$(this.container).remove();if(this.overlay){if(this._ie6()){$(this.overlay).remove()}else{$(this.overlay).fadeOut(fs,function(){$(this).remove()})}}return false}}})(jQuery);var jceutilities=jQuery.jceUtilities;var jcepopup=jceutilities.jcepopup;var jcelightbox=jceutilities.jcepopup;