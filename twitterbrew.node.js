/*

subscribers -> Spacebrew -> Twitter

Twitter -> Spacebrew -> Publishers


twitter user = Spacebrew instance
twitter hashtag = spacebrew publisher/subscriber

Type: string

bridgeconfig
{
twitteruser1 : {
  pubsub1,
  pubsub2

},

twitteruser2 : {
  pubsub3,
  pubsub4,

}

}

sbs = {};
twts = {};

each(bridgeconfigs as user, config){
  sbs[user] = new spacebrew();
  twts[user] = new twitter(user);
  
  each(config as channel){
    sbs[user].addpublish(channel, "string");
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
      each(config as channel){
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




