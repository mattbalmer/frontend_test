search = (function() {
    var search = {};

    search.init = function(config) {
        this.source = document.querySelector(config.source);
        this.results = document.querySelector(config.results);
        this.form = document.querySelector(config.form);
        this.input = this.form.querySelector('input');

        // Get the text content
        this.content = this.source.textContent;
        this.originalHTML = this.source.innerHTML;

        // Hook up a listener to the input
        this.input.onkeyup = function() {
            this.search(this.input.value)
        }.bind(this);

        // Hook up a listener to the form submit action
        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            this.search(this.input.value);
            return false;
        }.bind(this));

        // Run an initial search to clear the results text
        this.search(this.input.value);
    };

    search.search = function(query) {
        // Trim the query so that it wont search for empty spaces
        query = (query || '').trim();

        // If query is undefined or empty, do not search.
        if(query == '') {
            this.showResults();
            return;
        }

        // Use regexes to count the number of times a string
        // shows up in the content.
        // Add global (g) and case-insensitive (i) flags
        var matches = this.content.match( new RegExp(query, 'gi') )
            , count = (matches || []).length;

        this.showResults(query, count);
    };

    search.showResults = function(query, count) {
        query = query || '';

        if(query == '') {
            this.results.textContent = '[Please enter a search query]';
        } else {
            this.results.innerHTML = "Found <em>"+count+"</em> occurrences of the word <em>\""+query+"\"</em> in the below text.";
        }

        this.highlightResults(query);
    };

    search.highlightResults = function(query) {
        query = query || '';

        // Don't highlight if a query of less than 2 characters is given
        if(query.length < 2) {
            this.source.innerHTML = this.originalHTML;
            return;
        }

        // Create a copy of the original HTML, so we don't override it
        var newHTML = this.originalHTML;

        // wrap any spaces in the query with a regex matching HTML tags on either side
        query = query.replace(/(\s+)/g,'(<[^>]+>)*$1(<[^>]+>)*');

        // create a pattern regex from the query, and prefix the query
        // with a section that blocks HTML content from being searched
        var pattern = new RegExp('>([^<]*)('+query+')', 'gi');

        // Replace the search query with a wrapped <mark>query</mark> version
        newHTML = newHTML.replace(pattern, '>$1<mark>$2</mark>');

        this.source.innerHTML = newHTML;
    };

    return search;
}());

// On load - initialize the rotator
document.addEventListener('DOMContentLoaded', function() {
    search.init({
        form: '#search_form',
        source: '#search_text',
        results: '#search_results'
    });
});