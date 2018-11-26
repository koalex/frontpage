const assert  = require('assert');
const server  = require('@gen-server/server.js');
const request = require('supertest')(server);

describe('FRONTPAGE module', () => {
    describe('#render page layout', () => {
        it('should render RU page with Accept-Language header', function (done) {
            this.slow(1000); // render w/o cache
            request
                .get('/')
                .set('Accept-Language', 'ru-RU,ru;q=0.9,zh;q=0.8,zh-HK;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("lang=\"ru\""));
                })
                .end(done);
        });

        it('should render RU page with ?locale=ru param', done => {
            request
                .get('/?locale=ru')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("lang=\"ru\""));
                })
                .end(done);
        });

        it('should render RU "Not Supported Browser" page with Accept-Language header', function (done) {
            this.slow(1000); // render w/o cache
            request
                .get('/')
                .set('Accept-Language', 'ru-RU,ru;q=0.9,zh;q=0.8,zh-HK;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5')
                .set('User-Agent', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("браузер не поддерживается"));
                })
                .end(done);
        });

        it('should render RU "Not Supported Browser" page with ?locale=ru param', done => {
            request
                .get('/?locale=ru')
                .expect('Content-Type', /html/)
                .set('User-Agent', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("браузер не поддерживается"));
                })
                .end(done);
        });

        it('should render EN page with Accept-Language header', function (done) {
            this.slow(1000); // render w/o cache
            request
                .get('/')
                .set('Accept-Language', 'en-US,en;q=0.9,zh;q=0.8,zh-HK;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("lang=\"en\""));
                })
                .end(done);
        });

        it('should render EN page with ?locale=en param', done => {
            request
                .get('/?locale=en')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("lang=\"en\""));
                })
                .end(done);
        });

        it('should render EN "Not Supported Browser" page with Accept-Language header', function (done) {
            this.slow(1000); // render w/o cache
            request
                .get('/')
                .set('Accept-Language', 'en-US,en;q=0.9,zh;q=0.8,zh-HK;q=0.7,zh-TW;q=0.6,zh-CN;q=0.5')
                .set('User-Agent', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("browser is not supported"));
                })
                .end(done);
        });

        it('should render EN "Not Supported Browser" page with ?locale=en param', done => {
            request
                .get('/?locale=en')
                .expect('Content-Type', /html/)
                .set('User-Agent', 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)')
                .expect(200)
                .expect(response => {
                    assert.strictEqual(true, response.text.includes("browser is not supported"));
                })
                .end(done);
        });
    });
});
