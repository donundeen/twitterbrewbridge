var Twitter = require("twitter");
var secrets = require("./secrets.js");
var bridgeconfig = require("./bridgeconfig.js");

var twitterid = 922196835355283457;

//twitterid = 19132948;

var twitterClient = new Twitter({
  consumer_key: secrets.ConsumerKey,
  consumer_secret: secrets.ConsumerSecret,
  access_token_key: secrets.AccessToken,
  access_token_secret: secrets.AccessSecret
});



var sendTwitterMessage = function(device, channel, message){
  var fullmessage = "#"+device + "#"+channel + " ["+Math.random().toString().substr(3,4)+"]" + message;
  twitterClient.post('statuses/update', {status: fullmessage},  function(error, tweet, response) {
    if(error) { 
      console.log("ERROR");
      console.log(error);
      throw error
    };
    console.log("sent message :" + fullmessage);
//    console.log(tweet);  // Tweet body. 
//    console.log(response);  // Raw response object. 
  });
};


var openSearchStream = function(device, channel){
  console.log("following " + twitterid);
 // twitterClient.stream('statuses/filter', {track: "#"+device + "#"+channel }, function(stream) {
  twitterClient.stream('statuses/filter', {follow: twitterid }, function(stream) {
    stream.on('data', function(event) {
      console.log("got data");
      console.log(event && event.text);
    });
   
    stream.on('error', function(error) {
      console.log("ERROR");
      console.log(error);
      throw error;
    });
  });
};


//openSearchStream("device1", "channel2");
openSearchStream("device1", "channel2");


//sendTwitterMessage("device1" ,"channel2", "just testing 9");



var sbs = {};
var twts = {};





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
        twts[_user].tweets.sendmsgs("#"+_user+" #"+_channel+" ::: " + string); // send as dm (or with @ ?)
      });
    }(_user, channel);
  }
}


every(second){
  each(configs as user, config){
    function(_user){
      each(config.publishers as channel){
        twts[_user].dms().search("#"+_user+" #"+_channel+" ::: ", fuction(results){ // searching dms, or @?
          each(results as result){
            var message = result.match(/regex/)[1];
            sbs[user].sendmsg(_channel, message);
          }
        });
    }(user);
  }
}
*/




