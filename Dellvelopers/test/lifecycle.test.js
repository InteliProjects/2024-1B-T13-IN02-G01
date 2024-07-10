// Importa o módulo 'sails' para configurar e levantar a aplicação Sails.js
var sails = require('sails');

before(function (done) {
  this.timeout(10000); // Define um tempo limite de 10 segundos para levantar o servidor Sails, caso o Sails não levente, o teste não procede

  // Levanta a aplicação Sails com configurações específicas
  sails.lift(
    {
      hooks: { grunt: false, csrf: false }, // Desabilita os hooks 'grunt' e 'csrf' para agilizar o processo de levantamento
      log: { level: 'warn' }, // Define o nível de log para 'warn' para reduzir a verbosidade dos logs
    },
    function (err) {
      // Verifica se houve erro ao levantar a aplicação
      if (err) {
        // Imprime o erro
        console.error('Failed to lift Sails:', err);
        return done(err);
      }

      // Finaliza com sucesso
      return done();
    }
  );
});

after(function (done) {
  sails.lower(done); // Instala sails após rodar o teste
});
