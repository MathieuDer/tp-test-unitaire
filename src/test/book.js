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

describe('Tests unitaires', function () {

    describe('Simulation de bonnes réponse', function () {

        /** 
         * /GET
         * Que la réponse ait un status 200 
         * Que la clé books de la réponse simulé soit un array
         */
        it('/GET Books array', function () {
            //     expect('foo').to.be.a('string');
        });

        /**
         * /POST
         * Que la réponse ait un status 200
         * Que la clé message de la réponse simulé soit :  ‘book successfully added’
         */
        it('/POST message "book successfully added"', function () {
        });

        /**
         * /PUT
         * Que la réponse ait un status 200
         * Que la clé message de la réponse simulé soit :  ‘book successfully updated’
         */
        it('/PUT message "book successfully updated"', function () {
        });

        /**
         * /DELETE
         * Que la réponse ait un status 200
         * Que la clé message de la réponse simulé soit :  ‘book successfully deleted’
         */
        it('/DELETE message "book successfully deleted"', function () {
        });

    });

    describe('Simulation de mauvaises réponses', function () {
        /**
         * /GET
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error fetching books’
         */
        it('/GET message "error fetching books"', function () {
        });


        /**
         * /POST
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error adding the book’
         */
        it('/POST message "error adding the book"', function () {
        });


        /**
         * /PUT
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error updating the book’
         */
        it('/PUT message "error updating the book"', function () {
        });


        /**
         * /DELETE
         * Que la réponse ait un status 400
         * Que la clé message de la réponse simulé soit :  ‘error deleting the book’
         */
        it('/DELETE message "error deleting the book"', function () {
        });

    });


});






// Seconde série de test (simulation de mauvaise réponse)

