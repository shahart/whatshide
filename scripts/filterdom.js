// Copyright (c) 2016 Lelis Alves, Rodrigo Vieira. All rights reserved.
// Use of this source code is governed by a Apache license that can be
// found in the LICENSE file.


setTimeout(initExecution, 1000); //Init execution of the process all chats

/**
 * Verify if a specific string startsWith any substring in subtrings param
 *  @param {Array.<string>} subtrings Substrings Array to check if startsWith in string
 *  @memberof String
 */
String.prototype.containsAny = function(substrings) {
  
    for (var i = 0; i < substrings.length; i++) {
        if (this.startsWith(substrings[i])) {
            return true;                
        }
    }
    return false;
}

/**
 * Process a chat of the WhatsApp Web
 *  @param {number} index Index of the current chat
 */
function processChat(index) {
    var el = $(this);
    var str = el.text();

	if (str.toLowerCase().containsAny(substrings) ||
		// fix some wsapp change that prevented cell number contacts
		str.toLowerCase().substring(1).containsAny(substrings)) {
		el.show();
    } else {
        el.hide();
    }
}

/**
 * Var with the white list of contacts
 */
var substrings;

function onGetValue() {

	// hide header (profile, settings, ..)
	$(document.querySelectorAll("._1QUKR")).hide();
	// hide contact's Kebab menu - but user still can delete
	$(document.querySelectorAll(".PVMjB")).hide();
	// hide search, as user can reveal for a fraction of sec the chats
	$(document.querySelectorAll("._2EoyP")).hide();	
	// hide delete contact
	$(document.querySelectorAll("._3wAoe")).hide();
	// hide delete message/ forward/ etc.
	$(document.querySelectorAll("._2s_eZ")).hide();	

	// hide scroll for old messages
	$(document.querySelectorAll("._2-aNW")).css("overflow-y", "hidden");

	$(document.querySelectorAll("._2-aNW")).keydown(function(e) {
		switch(e.which) {
			case 38: // up
				e.stopImmediatePropagation()
		}
	});

    //Get All chats
	var items = document.querySelectorAll(".eJ0yJ");
	
	//Process all chats
    $(items).each(processChat);
		
    //Continue the execution
    setTimeout(onGetValue, 250);
}


/**
 * init Execution
 */
function initExecution() {
	substrings = [
		'+972 10-123-4567', // Alice
		'bob'
	];

	for (var i = 0; i < substrings.length; i++) {
        if (substrings[i].toLowerCase() != substrings[i]) {
			alert(substrings[i] + ' - not lowered case');
		}
	}

	onGetValue();
}
