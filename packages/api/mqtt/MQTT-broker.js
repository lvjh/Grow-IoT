import mosca from 'mosca';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const MQTT = new Mongo.Collection('mqtt');
 
var mongopubsub = {
  type: 'mongo',
  url: 'mongodb://localhost:3001/meteor',
  pubsubCollection: 'mqtt',
  mongo: {}
};

var settings = {
  port: 1883,
  backend: mongopubsub,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:3001/meteor' 
  }
};
 
var server = new mosca.Server(settings);
 
server.on('ready', setup);
 
// fired when the mqtt server is ready 
function setup() {
  console.log('Mosca server is up and running');

  // var message = {
  //   topic: '/hello/world',
  //   payload: new Buffer('this is a test'),
  //   qos: 0, // 0, 1, or 2
  //   retain: false // or true
  // };

  // server.publish(message);

  // var register = {
  //   topic: '/register',
  //   payload: new Buffer('this is a test'),
  //   qos: 0, // 0, 1, or 2
  //   retain: false // or true
  // };

  // server.publish(register);

  // // fired when a client connects
  // server.on('clientConnected', function(client) {
  //   console.log('Client connected: ', client.id);
  // });

  // // fired when a client disconnects
  // server.on('clientDisconnected', function(client) {
  //   console.log('Client disconnected: ', client.id);
  // });
   
  // fired when a message is received 
  server.on('published', function(packet, client) {
    // console.log(packet.topic)

    let message = packet.payload.toString();
    // console.log(message);
    
    // if (packet !== undefined) {
    switch (packet.topic) {
      case 'register':
        let deviceInfo = JSON.parse(packet.payload.toString());
        console.log('Register: ' + packet.payload.toString());
        // TODO: get something like this working.
        // Meteor.call('Device.register',
        //   deviceInfo,
        //   Meteor.bindEnvironment((error, documentId) => {
        //     if (error) {
        //       console.error("New deviceerror", error);
        //       return alert(`New deviceerror: ${error.reason || error}`);
        //     } else {}
        //   }
        // ));
        break;
      case "sendData":
        console.log('Data', packet.payload.toString());
        break;
      case "setProperty":
        console.log('Published', packet.payload.toString());
        break;
      default:
        return;
      // }
    }
  });

  // Meteor.methods({
  //   ['Device.sendCommand'](deviceUuid, type, options) {
  //     // TODO: Do better checks.
  //     check(deviceUuid, Match.NonEmptyString);
  //     check(type, Match.NonEmptyString);

  //     let device = Device.documents.findOne(
  //       {uuid: deviceUuid}
  //     , {
  //       fields: {
  //         _id: 1
  //       }
  //     });

  //     if (!device) { throw new Meteor.Error('not-found', `Device '${deviceUuid}' cannot be found.`); }

  //     return Message.send(device, {
  //       type,
  //       options
  //     });
  //   }
  // });

}
