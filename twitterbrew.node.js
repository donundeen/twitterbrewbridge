/*
// see also: http://randomnerdtutorials.com/posting-a-tweet-with-the-esp8266/
// https://www.npmjs.com/package/twitter
// https://www.npmjs.com/package/spacebrew


subscribers -> Spacebrew -> Twitter

Twitter -> Spacebrew -> Publishers


twitter user = Spacebrew instance
twitter hashtag = spacebrew publisher/subscriber

Type: string

bridgeconfig
{
twitteruser1 : {
  publishers:{
    pub1,
    pub2
  },
  subscribers :{
    sub1,
    sub2
  }

},

twitteruser2 : {
  publishers:{
    pub1,
    pub2
  },
  subscribers :{
    sub1,
    sub2
  }

}

sbs = {};
twts = {};

each(bridgeconfigs as user, config){
  sbs[user] = new spacebrew();
  twts[user] = new twitter(user);
  
  each(config.publishers as channel){
    sbs[user].addpublish(channel, "string");
  }

  each(config.subscribers as channel){
    sbs[user].addsubscribe(channel, "string");
    function(_user, _channel){
      sbs[_user].handlestring(string, function(){
        twts[_user].tweets.sendmsgs("@"+_user+" #"+_channel+" ::: " + string); // send as dm (or with @ ?)
      });
    }(_user, channel);
  }
}


every(second){
  each(configs as user, config){
    function(_user){
      each(config.publishers as channel){
        twts[_user].dms().search("@"+_user+" #"+_channel+" ::: ", fuction(results){ // searching dms, or @?
          each(results as result){
            var message = result.match(/regex/)[1];
            sbs[user].sendmsg(_channel, message);
          }
        });
    }(user);
  }
}
*/




