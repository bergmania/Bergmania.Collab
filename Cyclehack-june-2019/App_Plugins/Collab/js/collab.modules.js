angular.module('bergmania.collab',
    [
        'umbraco.filters',
        'umbraco.directives',
        'umbraco.services',
    ]);
angular.module('bergmania.collab.services', []);
angular.module('umbraco.packages').requires.push('bergmania.collab');