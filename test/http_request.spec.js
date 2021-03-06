// Generated by CoffeeScript 1.12.3
(function() {
  var AWS, helpers;

  helpers = require('./helpers');

  AWS = helpers.AWS;

  describe('AWS.HttpRequest', function() {
    var agentHeader, isBrowser, request;
    request = null;
    agentHeader = null;
    isBrowser = AWS.util.isBrowser();
    if (isBrowser) {
      agentHeader = 'X-Amz-User-Agent';
    } else {
      agentHeader = 'User-Agent';
    }
    beforeEach(function() {
      return request = new AWS.HttpRequest('http://domain.com');
    });
    describe('constructor', function() {
      it('defaults to POST method requests', function() {
        return expect(request.method).to.equal('POST');
      });
      it('defaults the uri to /', function() {
        return expect(request.path).to.equal('/');
      });
      it('provides headers with a default user agent', function() {
        var headers;
        headers = {};
        headers[agentHeader] = AWS.util.userAgent();
        return expect(request.headers).to.eql(headers);
      });
      it('defaults body to empty string', function() {
        return expect(request.body).to.equal('');
      });
      it('defaults endpointPrefix to undefined', function() {
        return expect(request.endpointPrefix).to.equal(void 0);
      });
      return it('uses the path from the endpoint if provided', function() {
        request = new AWS.HttpRequest('http://domain.com/path');
        return expect(request.path).to.equal('/path');
      });
    });
    describe('pathname', function() {
      it('defaults to /', function() {
        return expect(request.pathname()).to.equal('/');
      });
      return it('returns the path portion of the uri', function() {
        request.path = '/abc/xyz?mno=hjk';
        return expect(request.pathname()).to.equal('/abc/xyz');
      });
    });
    describe('search', function() {
      it('defaults to an empty string', function() {
        return expect(request.search()).to.equal('');
      });
      it('returns a sorted string', function() {
        request.path = '/version/service?foo=3&foo.options=4&bar=1&baz=2&quux=5';
        return expect(request.search()).to.equal('bar=1&baz=2&foo=3&foo.options=4&quux=5');
      });
      return it('returns the querystring portion of the uri', function() {
        request.path = '/abc/xyz?mno=hjk';
        return expect(request.search()).to.equal('mno=hjk');
      });
    });
    describe('updateEndpoint', function() {
      it('update request endpoint and path', function() {
        request.updateEndpoint('https://another.com:5678/path/service?foo=3&foo.options=5');
        expect(request.search()).to.equal('foo=3&foo.options=5');
        expect(request.pathname()).to.equal('/path/service');
        expect(request.path).to.equal('/path/service?foo=3&foo.options=5');
        expect(request.endpoint.port).to.equal(5678);
        expect(request.endpoint).to.include({
          port: 5678,
          hostname: 'another.com',
          host: 'another.com:5678',
          protocol: 'https:',
          href: 'https://another.com:5678/path/service?foo=3&foo.options=5'
        })
      })
    })
    describe('getUserAgentHeaderName', function() {
      it('provides the correct header for browser environments', function() {
        helpers.spyOn(AWS.util, 'isBrowser').andReturn(true);
        return expect(request.getUserAgentHeaderName()).to.equal('X-Amz-User-Agent');
      });
      return it('provides the correct header for node environments', function() {
        helpers.spyOn(AWS.util, 'isBrowser').andReturn(false);
        return expect(request.getUserAgentHeaderName()).to.equal('User-Agent');
      });
    });
    describe('appendToUserAgent', function() {
      return it('always appends a string to a user agent', function() {
        var headers;
        headers = {};
        headers[agentHeader] = AWS.util.userAgent() + ' custom';
        request = new AWS.HttpRequest('http://domain.com');
        request.appendToUserAgent('custom');
        return expect(request.headers).to.eql(headers);
      });
    });
    return describe('getUserAgent', function() {
      return it('returns previously set user agent', function() {
        var headers;
        headers = request.headers;
        expect(request.getUserAgent()).to.equal(headers[agentHeader]);
        request.appendToUserAgent('one');
        expect(headers[agentHeader]).to.match(/one$/);
        expect(request.getUserAgent()).to.equal(headers[agentHeader]);
        request.appendToUserAgent('two');
        expect(headers[agentHeader]).to.match(/two$/);
        return expect(request.getUserAgent()).to.equal(headers[agentHeader]);
      });
    });
  });

}).call(this);
