document.addEventListener("DOMContentLoaded", function() {
    window.scroll(0, 0)

    

    document.getElementById("clickme").addEventListener("click", function() {
        window.scroll(0, Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))
    })
    
    var scrollarrow = document.getElementById("scrollToTop");
    
    document.addEventListener("scroll", function() {
        if (window.scrollY >= 1.5 * Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)) {
            scrollarrow.className = "smallarrow up"
        }
        else {
            scrollarrow.className = ""
        }
    });

    scrollarrow.addEventListener("click", function() {
        console.log("the")
        window.scroll(0, 0)
    })
})