Package.describe({
  name: 'grow:core',
  summary: 'Grow-IoT core.',
  documentation: 'README.md',
  version: '0.2.0'
});

Package.onUse(function (api) {
  api.versionsFrom('1.2.0.2');

  // Core dependencies.
  api.use([
    'coffeescript',
    'accounts-password',
    'ddp-client',
    'underscore',
    'ecmascript'
  ]);

  // 3rd party dependencies.
  api.use([
    'peerlibrary:peerdb@0.19.3',
    'peerlibrary:peerdb-migrations@0.1.1',
    'peerlibrary:meteor-file@0.2.1',
    'peerlibrary:reactive-field@0.1.0',
    'peerlibrary:assert@0.2.5',
    'fermuch:cheerio@0.19.0',
    'alanning:roles@1.2.14',
    'peerlibrary:classy-job@0.2.0',
    'peerlibrary:user-extra@0.1.0'
  ]);

  api.export('User');
  api.export('Device');
  api.export('Data');
  api.export('Component');
  api.export('Environment');
  api.export('Notifications');
  api.export('Thing');
  api.export('Message', 'server');

  api.addFiles([
    'base.coffee',
    'documents/user.coffee',
    'documents/environment.coffee',
    'documents/device.coffee',
    'documents/data.coffee',
    'documents/notifications.coffee',
    'documents/thing.coffee',
    'finalize-documents.coffee'
  ]);

  api.addFiles([
    'documents/messages.coffee'
  ], 'server');
});