
document.addEventListener("touchstart", function() {}, !0), $(function() {
	var a = window._global.title || document.title,
		b = $.trim($(".custom-richtext:eq(0)").text()),
		c = b ? b.substring(0, 80) : a,
		d = window._global.current_page_link || document.documentURI,
		e = $(".content img")[0],
		f = Number(window._global.kdt_id) || 0,
		g = "shop" + (192168 + f);
	if (-1 !== d.indexOf("open.weixin.qq.com")) {
		d = decodeURIComponent(d);
		var h = d.match(/redirect_uri\=(.*?)[\&|\$]/i);
		h.length > 1 && -1 === h[1].indexOf("/x/") && (h = d.match(/state=(.*?)[\#|\&|\$]/i)), d = h.length > 1 ? h[1] : !1
	}
	f > 0 && (d = d.replace("wap", g));
	var i = "";
	e && (i = e.getAttribute("src") || e.getAttribute("data-src") || ""), wxReady(function() {
		var b = {
			title: a,
			link: d,
			desc: c,
			img_url: i,
			img_width: "200",
			img_height: "200"
		};
		WeixinJSBridge.on("menu:share:timeline", function() {
			WeixinJSBridge.invoke("shareTimeline", b, function() {})
		}), WeixinJSBridge.on("menu:share:facebook", function() {
			WeixinJSBridge.invoke("shareTimeline", b, function() {})
		}), WeixinJSBridge.on("menu:share:appmessage", function() {
			WeixinJSBridge.invoke("sendAppMessage", b, function() {})
		});
		var e = {
			content: a,
			link: d,
			img_url: i
		};
		WeixinJSBridge.on("menu:share:weibo", function() {
			WeixinJSBridge.invoke("shareWeibo", e, function() {})
		})
	})
}), $(function() {
	_global.js.hide_wx_nav ? wxReady(function() {
		WeixinJSBridge.call("hideToolbar")
	}) : wxReady(function() {
		WeixinJSBridge.call("showToolbar")
	})
}), function() {
	$.kdt = $.kdt || {}, $.extend($.kdt, {
		getFormData: function(a) {
			var b = a.serializeArray(),
				c = {};
			return $.map(b, function(a) {
				c[a.name] = a.value
			}), c
		},
		spm: function() {
			var a = $.kdt.getParameterByName("spm");
			return "" !== $.trim(a) ? window._global.spm.logType && window._global.spm.logId && (a += "_" + window._global.spm.logType + window._global.spm.logId) : a = window._global.spm.logType + window._global.spm.logId || "", a
		},
		isIOS: function() {
			return /(iPhone|iPad|iPod)/i.test(navigator.userAgent) ? !0 : !1
		},
		isAndroid: function() {
			return /Android/i.test(navigator.userAgent) ? !0 : !1
		},
		isWeixin: function() {
			return $.kdt._weixinEle = $.kdt._weixinEle || $(document.documentElement), $.kdt._weixinEle.hasClass("wx_mobile")
		},
		isMobile: function() {
			return window._global.is_mobile
		},
		isWifi: !1,
		isCellular: !1,
		getParameterByName: function(a) {
			a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			var b = "[\\?&]" + a + "=([^&#]*)",
				c = new RegExp(b),
				d = c.exec(window.location.search);
			return null === d ? "" : decodeURIComponent(d[1].replace(/\+/g, " "))
		},
		addParameter: function(a, b) {
			var c = a.split("#");
			a = c[0];
			for (var d in b) if (b.hasOwnProperty(d)) {
				if ("" === $.trim(b[d])) continue;
				if (a.indexOf("?") < 0) a += "?" + $.trim(d) + "=" + $.trim(b[d]);
				else {
					var e = {},
						f = a.split("?");
					$.each(f[1].split("&"), function(a, b) {
						var c = b.split("=");
						"" !== $.trim(c[1]) && (e[c[0]] = c[1])
					}), $.each(b, function(a, b) {
						"" !== $.trim(b) && (e[a] = b)
					});
					var g = [];
					$.each(e, function(a, b) {
						g.push(a + "=" + b)
					}), a = f[0] + "?" + g.join("&")
				}
			}
			return 2 === c.length && (a += "#" + c[1]), a
		},
		log: function(a, b) {
			var c = new Image,
				d = Math.floor(2147483648 * Math.random()).toString(36);
			key = "log_" + d, window[key] = c, c.onload = c.onerror = c.onabort = function() {
				c.onload = c.onerror = c.onabort = null, window[key] = null, c = null, b === Object(b) && _.isFunction(b.resolve) && b.resolve()
			}, c.src = $.kdt.addParameter(a, {
				time: Date.now()
			})
		},
		getTaobaoModal: function() {
			return $.kdt._taobaoEle = $.kdt._taobaoEle || $("#js-fuck-taobao")
		},
		fuckTaobao: function(a) {
			return ($.kdt.isIOS() || $.kdt.isAndroid()) && $.kdt.isWeixin() && (a.indexOf("taobao.com") >= 0 || a.indexOf("tmall.com") >= 0)
		},
		openModal: function() {
			this._opened || ($.kdt.isIOS() ? ($.kdt.getTaobaoModal().find(".js-step-2").addClass("step-2"), this._opened = !0) : $.kdt.isAndroid() && ($.kdt.getTaobaoModal().find(".js-step-2").addClass("step-and-2"), this._opened = !0)), $.kdt.getTaobaoModal().removeClass("hide")
		},
		openLink: function(a, b) {
			if (void 0 !== a && null !== a) {
				if ($.kdt.fuckTaobao(a)) return $.kdt.openModal();
				if (b = b || !1) {
					var c = window.open(a, "_blank");
					c.focus()
				} else location.href = a
			}
		},
		parseWeibo: function(a) {
			a = a.toLowerCase();
			var b;
			if (a.indexOf("/showcase/") >= 0) {
				var c = a.match(/\/showcase\/(\w+)\?alias=(\w+)(&|$)/i);
				b = {
					type: c[1],
					alias: c[2]
				}
			} else if (a.indexOf("/x/") >= 0) {
				var d = a.match(/\/x\/(\w+)$/i);
				b = {
					type: "x",
					alias: d[1]
				}
			}
			return b
		}
	})
}(), $(function() {
	wxReady(function() {
		WeixinJSBridge.invoke("getNetworkType", {}, function(a) {
			var b = $.trim(a.err_msg);
			"network_type:wifi" === b && ($(document.documentElement).addClass("wifi"), $.kdt.isWifi = !0), ("network_type:edge" === b || "network_type:wwan" === b) && ($.kdt.isCellular = !0);
			var c = {
				spm: $.kdt.spm(),
				fm: "display_network",
				referer_url: encodeURIComponent(document.referrer),
				title: $.trim(document.title),
				msg: encodeURIComponent(b)
			}
		})
	})
}), function(a, b, c, d) {
	var e = a(b);
	a.fn.lazyload = function(c) {
		function f(a, b) {
			var c, d, e, f = j.width,
				g = j.height,
				h = b / a;
			return b >= g && a >= f ? (d = f, e = f * h, c = {
				marginTop: (g - e) / 2
			}) : b >= g && f >= a ? c = {
				marginLeft: (f - a) / 2,
				marginTop: (g - b) / 2
			} : g >= b && a >= f ? (d = f, e = f * h, c = {
				marginTop: (g - e) / 2
			}) : g >= b && f >= a && (c = {
				marginLeft: (f - a) / 2,
				marginTop: (g - b) / 2
			}), d = d || a, e = e || b, {
				width: d,
				height: e,
				style: c
			}
		}
		function g() {
			var b = 0;
			i.each(function() {
				var c = a(this);
				if (!j.skip_invisible || c.is(":visible")) if (a.abovethetop(this, j) || a.leftofbegin(this, j));
				else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
					if (++b > j.failure_limit) return !1
				} else c.trigger("appear"), b = 0
			})
		}
		var h, i = this,
			j = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: b,
				data_attribute: "src",
				skip_invisible: !1,
				appear: null,
				load: null,
				width: null,
				height: null,
				resize: !1
			};
		return c && (d !== c.failurelimit && (c.failure_limit = c.failurelimit, delete c.failurelimit), d !== c.effectspeed && (c.effect_speed = c.effectspeed, delete c.effectspeed), a.extend(j, c)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
			return g()
		}), this.each(function() {
			var b = this,
				c = a(b);
			b.loaded = !1, c.parent().addClass("loading"), c.one("appear", function() {
				if (!this.loaded) {
					if (j.appear) {
						var d = i.length;
						j.appear.call(b, d, j)
					}
					
				}
			}), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
				b.loaded || c.trigger("appear")
			})
		}), e.bind("resize", function() {
			g()
		}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
			b.originalEvent.persisted && i.each(function() {
				a(this).trigger("appear")
			})
		}), a(b).ready(function() {
			g()
		}), this
	}, a.belowthefold = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.height() + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
	}, a.rightoffold = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
	}, a.abovethetop = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + (a(c).height() || f.height)
	}, a.leftofbegin = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + (a(c).width() || f.width)
	}, a.inviewport = function(b, c) {
		return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
	}
}($, window, document), function() {
	function a(a) {
		"undefined" != typeof window.WeixinJSBridge && WeixinJSBridge.invoke("imagePreview", {
			current: a,
			urls: k
		})
	}
	var b = $.kdt.spm();
	$.kdt.clickLogHandler = function(a) {
		function c() {
			var c = $.Deferred().done(function() {
				e.match(/^https?:\/\/\S*\.?(koudaitong\.com|kdt\.im)/) && (e = $.kdt.addParameter(e, {
					spm: b
				})), ($.kdt.isMobile() || !f) && $.kdt.openLink(e)
			}),
				d = {
					spm: b,
					fm: "click",
					url: window.encodeURIComponent(e),
					referer_url: encodeURIComponent(document.referrer),
					title: $.trim(h)
				};
			a.fromMenu && $.extend(d, {
				click_type: "menu"
			}), null !== g && void 0 !== g && $.extend(d, {
				click_id: g
			});
	
		}
		var d = $(this),
			e = d.attr("href"),
			f = "_blank" === d.attr("target"),
			g = d.data("goods-id"),
			h = d.prop("title") || d.text();
		"" === $.trim(e) || 0 === $.trim(e).indexOf("javascript") || d.hasClass("js-no-follow") || (c(), ($.kdt.isMobile() || !f) && a.preventDefault())
	}, $(document).on("click", "a", $.kdt.clickLogHandler);
	var c = function() {
			var a = [],
				b = $(".js-goods");
			return b.length < 1 ? null : (b.each(function(b, c) {
				var d = $(c);
				a.push(d.data("goods-id"))
			}), a.join(","))
		}(),
		d = {
			spm: b,
			fm: "display",
			referer_url: encodeURIComponent(document.referrer),
			title: $.trim(document.title)
		};
	c && $.extend(d, {
		display_goods: c
	});

	
	var h = window.navigator.userAgent,
		i = h.match(/MicroMessenger\/(\d+(\.\d+)*)/);
	if (null !== i && i.length) {
		var j = $(".js-image-swiper img, .custom-richtext img"),
			k = [],
			l = 0;
		j.each(function() {
			var b = $(this),
				c = b.attr("data-src") || b.attr("src");
			if (b.width() >= l && c) {
				if (b.parents("a").length > 0) return;
				k.push(c), b.on("click", function() {
					a(c)
				})
			}
		})
	}
}($, window, document), function() {
	$.kdt.getTaobaoModal().on("touchstart", function(a) {
		$(a.target), a.target.className.indexOf("step-") < 0 && $.kdt.getTaobaoModal().addClass("hide")
	})
}(), function() {
	var a = {
		showSubmenu: function(a) {
			var b = $(a.target),
				c = b.parents(".one"),
				d = b.hasClass(".js-mainmenu") ? b : c.find(".js-mainmenu"),
				e = c.find(".js-submenu"),
				f = e.find(".arrow"),
				g = b.parents(".js-navmenu"),
				h = g.find(".one"),
				i = h.length,
				j = h.index(c),
				k = d.outerWidth(),
				l = (e.outerWidth() - d.outerWidth()) / 2,
				m = e.outerWidth() / 2;
			if (0 === e.size()) $(".js-submenu:visible").hide();
			else {
				var n = e.outerWidth(),
					o = c.outerWidth(),
					p = "auto",
					q = "auto",
					r = "auto",
					s = "auto";
				0 === j ? (p = d.position().left - l, q = m - f.outerWidth() / 2) : j === i - 1 ? n > o ? (r = 8, s = k / 2 - r) : (p = d.position().left - l, q = m - f.outerWidth() / 2) : (p = d.position().left - l, q = m - f.outerWidth() / 2);
				var t = 5;
				0 > p && (q = q + p + t, p = t), 0 > r && (s = s + r + t, r = t), e.css({
					left: p,
					right: r
				}), f.css({
					left: q,
					right: s
				}), $(".js-submenu:visible").not(e).hide(), e.toggle()
			}
		},
		openNavmenu: function(a) {
			var b = $(".js-navmenu");
			b.slideToggle("fast"), $(".js-submenu:visible").hide(), $(".js-open-navmenu .caret").toggleClass("up-arrow"), a.stopPropagation()
		}
	};
	$.kdt.isMobile() ? ($(document).on("touchstart", function() {
		$(".js-submenu:visible").hide(0), $(".js-open-navmenu .caret").removeClass("up-arrow")
	}), $("body").on("touchstart", ".js-navmenu", function(a) {
		a.fromMenu = !0, $.kdt.clickLogHandler.call(a.target, a), a.stopPropagation()
	}), $("body").on("touchstart", ".js-submenu", function(a) {
		a.fromMenu = !0, $.kdt.clickLogHandler.call(a.target, a), a.stopPropagation()
	}), $("body").on("touchstart", ".js-mainmenu", function(b) {
		a.showSubmenu(b)
	}), $("body").on("touchstart", ".js-open-navmenu", function(b) {
		a.openNavmenu(b)
	})) : ($(document).on("click", function() {
		$(".js-submenu:visible").hide(0), $(".js-open-navmenu .caret").removeClass("up-arrow")
	}), $("body").on("click", ".js-navmenu", function(a) {
		a.fromMenu = !0, $.kdt.clickLogHandler.call(a.target, a), a.stopPropagation()
	}), $("body").on("click", ".js-submenu", function(a) {
		a.fromMenu = !0, $.kdt.clickLogHandler.call(a.target, a), a.stopPropagation()
	}), $("body").on("click", ".js-mainmenu", function(b) {
		a.showSubmenu(b)
	}), $("body").on("click", ".js-open-navmenu", function(b) {
		a.openNavmenu(b)
	}));
	var b = ".nav-on-bottom";		
	$(b).size() + c.size() > 0 && $("body").css("padding-bottom", $(".js-navmenu").height() || c.height())
}();