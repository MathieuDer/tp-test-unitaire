import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import chaiNock from 'chai-nock';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import nock from 'nock';

import server from '../server';
import resetDatabase from '../utils/resetDatabase';

chai.use(chaiHttp);
chai.use(chaiNock);
chai.use(chaiAsPromised);

// tout les packages et fonction nescessaire au test sont importé ici, bon courage

// fait les Tests d'integration en premier
describe('empty database', () => {
    it('should get empty books', done => {
        chai
            .request(server)
            .get('/book')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.books).to.be.a('array');
                expect(res.body.books.length).to.equal(0);
                done();
            });
    });

    it('should post book', done => {
        chai
            .request(server)
            .post('/book')
            .send(
                {
                    id: '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a7',
                    title: 'Coco raconte Channel 3',
                    years: 1995,
                    pages: 405
                }
            )
            .end((err, res) => {
                if (err) console.log(err);
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.equals("book successfully added");
                done();
            });
    });
});

describe('mocked database', () => {

    it('should update book', done => {

        const id = '0db0b43e-dddb-47ad-9b4a-e5fe9ec7c2a9';

        chai
            .request(server)
            .put(`/book/:${id}`)
            .send(
                {
                    title: 'Coco raconte Channel 9'
                }
            )
            .end((err, res) => {
                if (err) console.log(err);
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("book successfully updated");
                done();
            });
    });

    it('should delete book', done => {
        chai
            .request(server)
            .delete('/book/:id')
            .end((err, res) => {
                if (err) console.log(err);
                expect(res).to.have.status(200);
                expect(res.body.message).to.equals("book successfully deleted");
                done();
            });
    });

});
