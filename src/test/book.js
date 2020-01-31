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



/*** TESTS UNITAIRES ***/

describe('Tests unitaires', () => {

    /**
     * On devra s’assurer également que les intercepteurs soient clean entre chaque test.
     */
    afterEach(() => nock.cleanAll());

    /**
     * Premiere série de test (simulation de réponse ok)
     */
    describe('Simulation de bonnes réponse', () => {

        /** 
         * /GET
         * Que la réponse ait un status 200 
         * Que la clé books de la réponse simulé soit un array
         */
        it('/GET Books array', done => {

            nock("http://localhost:8080")
                .get('/book')
                .reply(200, { books: [] });

            chai
                .request('http://localhost:8080')
                .get('/book')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.books).to.be.a('array');
                    expect(res.body.books.length).to.equal(0);
                    done();
                });

        });

        /**
         * /POST
         * Que la réponse ait un status 200
         * Que la clé message de la réponse simulé soit :  ‘book successfully added’
         */
        it('/POST message "book successfully added"', done => {

            nock("http://localhost:8080")
                .post('/book')
                .reply(200, { message: 'book successfully added' });

            chai
                .request('http://localhost:8080')
                .post('/book')
                .send({
                    "id": "55b7d315-1a5f-4b13-a665-c382a6c71756",
                    "title": "Oui-Oui contre Dominique Strauss-Kahn",
                    "years": "2015",
                    "pages": "650"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('book successfully added');
                    done();
                });

        });

        /**
         * /PUT
         * Que la réponse ait un status 200
         * Que la clé message de la réponse simulé soit :  ‘book successfully updated’
         */
        it('/PUT message "book successfully updated"', done => {

            nock("http://localhost:8080")
                .put('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .reply(200, { message: 'book successfully updated' });

            chai
                .request('http://localhost:8080')
                .put('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .send({
                    "pages": "650"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('book successfully updated');
                    done();
                });
        });

        /**
         * /DELETE
         * Que la réponse ait un status 200
         * Que la clé message de la réponse simulé soit :  ‘book successfully deleted’
         */
        it('/DELETE message "book successfully deleted"', done => {

            nock("http://localhost:8080")
                .delete('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .reply(200, { message: 'book successfully deleted' });

            chai
                .request('http://localhost:8080')
                .delete('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('book successfully deleted');
                    done();
                });
        });

    });

    /**
     * Seconde série de test (simulation de mauvaise réponse)
     */
    describe('Simulation de mauvaises réponses', () => {

        /**
         * /GET
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error fetching books’
         */
        it('/GET message "error fetching books"', done => {

            nock("http://localhost:8080")
                .get('/book')
                .reply(400, { message: 'error fetching books' });

            chai
                .request('http://localhost:8080')
                .get('/book')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('error fetching books');
                    done();
                });
        });

        /**
         * /POST
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error adding the book’
         */
        it('/POST message "error adding the book"', done => {

            nock("http://localhost:8080")
                .post('/book')
                .reply(400, { message: 'error adding the book' });

            chai
                .request('http://localhost:8080')
                .post('/book')
                .send({
                    "id": "55b7d315-1a5f-4b13-a665-c382a6c71756",
                    "title": "Oui-Oui contre Dominique Strauss-Kahn",
                    "years": "2015",
                    "pages": "650"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('error adding the book');
                    done();
                });
        });

        /**
         * /PUT
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error updating the book’
         */
        it('/PUT message "error updating the book"', done => {

            nock("http://localhost:8080")
                .put('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .reply(400, { message: 'error updating the book' });

            chai
                .request('http://localhost:8080')
                .put('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .send({
                    "pages": "650"
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('error updating the book');
                    done();
                });
        });

        /**
         * /DELETE
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error deleting the book’
         */
        it('/DELETE message "error deleting the book"', done => {

            nock("http://localhost:8080")
                .delete('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .reply(400, { message: 'error deleting the book' });

            chai
                .request('http://localhost:8080')
                .delete('/book/55b7d315-1a5f-4b13-a665-c382a6c71756')
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.a('object');
                    expect(res.body.message).to.be.a('string');
                    expect(res.body.message).to.equal('error deleting the book');
                    done();
                });
        });
    });
});
