class Base {
    getHtmlTranslationTable(table, quoteStyle) {
        //  discuss at: http://locutus.io/php/get_html_translation_table/
        // original by: Philip Peterson
        //  revised by: Kevin van Zonneveld (http://kvz.io)
        // bugfixed by: noname
        // bugfixed by: Alex
        // bugfixed by: Marco
        // bugfixed by: madipta
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: T.Wild
        // improved by: KELAN
        // improved by: Brett Zamir (http://brett-zamir.me)
        //    input by: Frank Forte
        //    input by: Ratheous
        //      note 1: It has been decided that we're not going to add global
        //      note 1: dependencies to Locutus, meaning the constants are not
        //      note 1: real constants, but strings instead. Integers are also supported if someone
        //      note 1: chooses to create the constants themselves.
        //   example 1: get_html_translation_table('HTML_SPECIALCHARS')
        //   returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}

        var entities = {};
        var hashMap = {};
        var decimal;
        var constMappingTable = {};
        var constMappingQuoteStyle = {};
        var useTable = {};
        var useQuoteStyle = {};

        // Translate arguments
        constMappingTable[0] = "HTML_SPECIALCHARS";
        constMappingTable[1] = "HTML_ENTITIES";
        constMappingQuoteStyle[0] = "ENT_NOQUOTES";
        constMappingQuoteStyle[2] = "ENT_COMPAT";
        constMappingQuoteStyle[3] = "ENT_QUOTES";

        useTable = !isNaN(table)
        ? constMappingTable[table]
        : table
        ? table.toUpperCase()
        : "HTML_SPECIALCHARS";

        useQuoteStyle = !isNaN(quoteStyle)
        ? constMappingQuoteStyle[quoteStyle]
        : quoteStyle
        ? quoteStyle.toUpperCase()
        : "ENT_COMPAT";

        if (useTable !== "HTML_SPECIALCHARS" && useTable !== "HTML_ENTITIES") {
        throw new Error("Table: " + useTable + " not supported");
        }

        entities["38"] = "&amp;";
        if (useTable === "HTML_ENTITIES") {
        entities["160"] = "&nbsp;";
        entities["161"] = "&iexcl;";
        entities["162"] = "&cent;";
        entities["163"] = "&pound;";
        entities["164"] = "&curren;";
        entities["165"] = "&yen;";
        entities["166"] = "&brvbar;";
        entities["167"] = "&sect;";
        entities["168"] = "&uml;";
        entities["169"] = "&copy;";
        entities["170"] = "&ordf;";
        entities["171"] = "&laquo;";
        entities["172"] = "&not;";
        entities["173"] = "&shy;";
        entities["174"] = "&reg;";
        entities["175"] = "&macr;";
        entities["176"] = "&deg;";
        entities["177"] = "&plusmn;";
        entities["178"] = "&sup2;";
        entities["179"] = "&sup3;";
        entities["180"] = "&acute;";
        entities["181"] = "&micro;";
        entities["182"] = "&para;";
        entities["183"] = "&middot;";
        entities["184"] = "&cedil;";
        entities["185"] = "&sup1;";
        entities["186"] = "&ordm;";
        entities["187"] = "&raquo;";
        entities["188"] = "&frac14;";
        entities["189"] = "&frac12;";
        entities["190"] = "&frac34;";
        entities["191"] = "&iquest;";
        entities["192"] = "&Agrave;";
        entities["193"] = "&Aacute;";
        entities["194"] = "&Acirc;";
        entities["195"] = "&Atilde;";
        entities["196"] = "&Auml;";
        entities["197"] = "&Aring;";
        entities["198"] = "&AElig;";
        entities["199"] = "&Ccedil;";
        entities["200"] = "&Egrave;";
        entities["201"] = "&Eacute;";
        entities["202"] = "&Ecirc;";
        entities["203"] = "&Euml;";
        entities["204"] = "&Igrave;";
        entities["205"] = "&Iacute;";
        entities["206"] = "&Icirc;";
        entities["207"] = "&Iuml;";
        entities["208"] = "&ETH;";
        entities["209"] = "&Ntilde;";
        entities["210"] = "&Ograve;";
        entities["211"] = "&Oacute;";
        entities["212"] = "&Ocirc;";
        entities["213"] = "&Otilde;";
        entities["214"] = "&Ouml;";
        entities["215"] = "&times;";
        entities["216"] = "&Oslash;";
        entities["217"] = "&Ugrave;";
        entities["218"] = "&Uacute;";
        entities["219"] = "&Ucirc;";
        entities["220"] = "&Uuml;";
        entities["221"] = "&Yacute;";
        entities["222"] = "&THORN;";
        entities["223"] = "&szlig;";
        entities["224"] = "&agrave;";
        entities["225"] = "&aacute;";
        entities["226"] = "&acirc;";
        entities["227"] = "&atilde;";
        entities["228"] = "&auml;";
        entities["229"] = "&aring;";
        entities["230"] = "&aelig;";
        entities["231"] = "&ccedil;";
        entities["232"] = "&egrave;";
        entities["233"] = "&eacute;";
        entities["234"] = "&ecirc;";
        entities["235"] = "&euml;";
        entities["236"] = "&igrave;";
        entities["237"] = "&iacute;";
        entities["238"] = "&icirc;";
        entities["239"] = "&iuml;";
        entities["240"] = "&eth;";
        entities["241"] = "&ntilde;";
        entities["242"] = "&ograve;";
        entities["243"] = "&oacute;";
        entities["244"] = "&ocirc;";
        entities["245"] = "&otilde;";
        entities["246"] = "&ouml;";
        entities["247"] = "&divide;";
        entities["248"] = "&oslash;";
        entities["249"] = "&ugrave;";
        entities["250"] = "&uacute;";
        entities["251"] = "&ucirc;";
        entities["252"] = "&uuml;";
        entities["253"] = "&yacute;";
        entities["254"] = "&thorn;";
        entities["255"] = "&yuml;";
        }

        if (useQuoteStyle !== "ENT_NOQUOTES") {
        entities["34"] = "&quot;";
        }
        if (useQuoteStyle === "ENT_QUOTES") {
        entities["39"] = "&#39;";
        }
        entities["60"] = "&lt;";
        entities["62"] = "&gt;";

        // ascii decimals to real symbols
        for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            hashMap[String.fromCharCode(decimal)] = entities[decimal];
        }
        }

        return hashMap;
    }

    htmlEntityEncode(string, quoteStyle, charset, doubleEncode) {
        //  discuss at: http://locutus.io/php/htmlentities/
        // original by: Kevin van Zonneveld (http://kvz.io)
        //  revised by: Kevin van Zonneveld (http://kvz.io)
        //  revised by: Kevin van Zonneveld (http://kvz.io)
        // improved by: nobbler
        // improved by: Jack
        // improved by: Rafał Kukawski (http://blog.kukawski.pl)
        // improved by: Dj (http://locutus.io/php/htmlentities:425#comment_134018)
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        //    input by: Ratheous
        //      note 1: function is compatible with PHP 5.2 and older
        //   example 1: htmlentities('Kevin & van Zonneveld')
        //   returns 1: 'Kevin &amp; van Zonneveld'
        //   example 2: htmlentities("foo'bar","ENT_QUOTES")
        //   returns 2: 'foo&#039;bar'

        var hashMap = this.getHtmlTranslationTable("HTML_ENTITIES", quoteStyle);

        string = string === null ? "" : string + "";

        if (!hashMap) {
        return false;
        }

        if (quoteStyle && quoteStyle === "ENT_QUOTES") {
        hashMap["'"] = "&#039;";
        }

        doubleEncode = doubleEncode === null || !!doubleEncode;

        var regex = new RegExp(
        "&(?:#\\d+|#x[\\da-f]+|[a-zA-Z][\\da-z]*);|[" +
            Object.keys(hashMap)
            .join("")
            // replace regexp special chars
            .replace(/([()[\]{}\-.*+?^$|/\\])/g, "\\$1") +
            "]",
        "g"
        );

        return string.replace(regex, function(ent) {
        if (ent.length > 1) {
            return doubleEncode ? hashMap["&"] + ent.substr(1) : ent;
        }

        return hashMap[ent];
        });
    }

    htmlEntityDecode(string, quoteStyle) {
        // eslint-disable-line camelcase
        //  discuss at: http://locutus.io/php/html_entity_decode/
        // original by: john (http://www.jd-tech.net)
        //    input by: ger
        //    input by: Ratheous
        //    input by: Nick Kolosov (http://sammy.ru)
        // improved by: Kevin van Zonneveld (http://kvz.io)
        // improved by: marc andreu
        //  revised by: Kevin van Zonneveld (http://kvz.io)
        //  revised by: Kevin van Zonneveld (http://kvz.io)
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        // bugfixed by: Brett Zamir (http://brett-zamir.me)
        // bugfixed by: Fox
        //   example 1: html_entity_decode('Kevin &amp; van Zonneveld')
        //   returns 1: 'Kevin & van Zonneveld'
        //   example 2: html_entity_decode('&amp;lt;')
        //   returns 2: '&lt;'

        var tmpStr = "";
        var entity = "";
        var symbol = "";
        tmpStr = string.toString();

        var hashMap = this.getHtmlTranslationTable("HTML_ENTITIES", quoteStyle);
        if (hashMap === false) {
        return false;
        }

        // @todo: &amp; problem
        // http://locutus.io/php/get_html_translation_table:416#comment_97660
        delete hashMap["&"];
        hashMap["&"] = "&amp;";

        for (symbol in hashMap) {
        entity = hashMap[symbol];
        tmpStr = tmpStr.split(entity).join(symbol);
        }
        tmpStr = tmpStr.split("&#039;").join("'");

        return tmpStr;
    }

    trim(str, charlist) {
        //  discuss at: http://locutus.io/php/trim/
        // original by: Kevin van Zonneveld (http://kvz.io)
        // improved by: mdsjack (http://www.mdsjack.bo.it)
        // improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
        // improved by: Kevin van Zonneveld (http://kvz.io)
        // improved by: Steven Levithan (http://blog.stevenlevithan.com)
        // improved by: Jack
        //    input by: Erkekjetter
        //    input by: DxGx
        // bugfixed by: Onno Marsman (https://twitter.com/onnomarsman)
        //   example 1: trim('    Kevin van Zonneveld    ')
        //   returns 1: 'Kevin van Zonneveld'
        //   example 2: trim('Hello World', 'Hdle')
        //   returns 2: 'o Wor'
        //   example 3: trim(16, 1)
        //   returns 3: '6'

        var whitespace = [
        " ",
        "\n",
        "\r",
        "\t",
        "\f",
        "\x0b",
        "\xa0",
        "\u2000",
        "\u2001",
        "\u2002",
        "\u2003",
        "\u2004",
        "\u2005",
        "\u2006",
        "\u2007",
        "\u2008",
        "\u2009",
        "\u200a",
        "\u200b",
        "\u2028",
        "\u2029",
        "\u3000"
        ].join("");
        var l = 0;
        var i = 0;
        str += "";

        if (charlist) {
        whitespace = (charlist + "").replace(/([[\]().?/*{}+$^:])/g, "$1");
        }

        l = str.length;
        for (i = 0; i < l; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
        }

        l = str.length;
        for (i = l - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
        }

        return whitespace.indexOf(str.charAt(0)) === -1 ? str : "";
    }
}

module.exports = Base;
