var tabs = (function() {
    var tabs = {};

    // Buffer of the current active header,
    // so we don't need to query for it each on each
    // change to turn it off.
    tabs.current = {};

    tabs.init = function() {
        var tabElements = document.querySelectorAll('.tab[data-tab]');

        // Assign the onclick for each tab header to show its content
        utils.forEach(tabElements, function(tab) {
            tab.onclick = function() {
                tabs.show(this);
            };
        });

        // Activate the first tab
        tabs.show(tabElements[0]);
    };

    tabs.show = function(tab) {
        var id = tab.getAttribute('data-tab')
            , content = document.querySelector('.tab-content[data-tab="'+id+'"]')
            , header = document.querySelector('.tab[data-tab="'+id+'"]');

        // If current is set, deactivate it
        if(tabs.current.header) {
            tabs.current.header.classList.remove('active');
            tabs.current.content.classList.remove('active');
        }

        // Activate our new current tab
        header.classList.add('active');
        content.classList.add('active');

        tabs.current.header = header;
        tabs.current.content = content;
    };

    return tabs;
}());

// On load - initialize and show first tab
document.addEventListener('DOMContentLoaded', function() {
    tabs.init();
});