 // console.log(safari.extension.settings.client)

settings = {
  "hostname_blacklist": ["twitter.com"]
}

function change_twitter_to_clients() {
  var anchors = document.getElementsByTagName("a");
  for (var i = 0; i < anchors.length; i++ ){

    var anchor = anchors[i]
    if(anchor.href){

      var href = anchor.href
      if(href.indexOf("://twitter") != -1){      
      
        var components = href.split("/")
        if(components.length == 4){
            var username = components[3]
            anchor.href = "tweetbot:///user_profile/" + username
        } 
        
      }
    }
  }
}

function hostnameIsNotBlacklisted(hostname) {
  return settings.hostname_blacklist.indexOf(hostname) == -1
}

// We want to support dynamically added content so on every document change
// do a quick check of the URLs. This will also most likely kick it to action initially.

var observer = new WebKitMutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    change_twitter_to_clients()
  });    
});

var hostname = new URL(document.URL).hostname

if (hostnameIsNotBlacklisted(hostname)) {
  var config = { attributes: true, childList: true, characterData: true, subtree: true };
  observer.observe(document.body, config);
  change_twitter_to_clients()
};