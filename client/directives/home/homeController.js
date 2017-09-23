var mainApp = angular.module('mainApp');

mainApp.controller('homeController', function ($scope, $http) {
	const BASE_URL = 'home';
	const BASE_URL_EQUIPAMENTO_CENTRAL = 'equipamento-central';
	$scope.message = "$scope.message : from homeController";

	$scope.formData = {};


	$http.get(BASE_URL_EQUIPAMENTO_CENTRAL + '/api/all-marcas').then(
		function (response) {
			$scope.listMarcasPreferencia = [{ text: "Qualquer", value: "Qualquer" }];
			response.data.forEach(function (marca) {
				$scope.listMarcasPreferencia.push({ text: marca, value: marca });
			})
		}, function (error) {
			console.log('Error: ' + error.data);
		});

	$scope.createVendaCentral = function () {
		$scope.listErros = []
		if (isTodosCamposPreenchidos($scope.vendaCentral)) {
			$http.post(BASE_URL + '/api/find-equipamentos-indicados', $scope.vendaCentral).then(
				function (response) {
					$('#modal-sugestao').modal('toggle')
					$scope.listSugestao = response.data
					console.log(response)
				}, function (error) {
					console.log('Error: ' + error.data);
				});
		} else {
			$scope.listErros.push({ text: 'Existem campos não preenchidos!' })
		}
	}

	isTodosCamposPreenchidos = function (vendaCentral) {
		console.log(vendaCentral)
		if (vendaCentral == null) { return false }
		if (vendaCentral.tpMarcaPreferencia == null) { return false };
		if (vendaCentral.tpQtdFuncionarios == null) { return false };
		if (vendaCentral.tpQtdLigacoesConcorrentes == null) { return false };
		if (vendaCentral.tpQtdToquesSimultaneos == null) { return false };
		if (vendaCentral.tpQtdHorasGravacao == null) { return false };
		if (vendaCentral.blDdr == null) { return false };
		if (vendaCentral.blPriorizaSolucao == null) { return false };
		if (vendaCentral.blComputadorAtendente == null) { return false };
		if (vendaCentral.blSecretariaEletronica == null) { return false };
		if (vendaCentral.blFuncaoRonda == null) { return false };
		if (vendaCentral.blFluxoAltoFiliais == null) { return false };
		if (vendaCentral.blFuncionarioRamalCelular == null) { return false };

		return true;
	}

	$scope.deleteHome = function (id) {
		$http.delete('api/delete/' + id).then(
			function (response) {
				$scope.listHome = response.data;
			}, function (error) {
				console.log('Error: ' + error.data);
			});

	}

	$scope.optionsTpQtdFuncionarios = [
		{ text: '12 pessoas', value: 'Q12' }
		, { text: '32 pessoas', value: 'Q32' }
		, { text: '64 pessoas', value: 'Q64' }
		, { text: '128 pessoas', value: 'Q128' }
		, { text: 'Mais que 128 pessoas', value: 'Q128M' }
	];

	$scope.optionsTpQtdToquesSimultaneos = [
		{ text: 'Até 6', value: 'Q6' }
		, { text: 'Até 10', value: 'Q10' }
		, { text: 'Até 30', value: 'Q30' }
		, { text: 'Mais que 30', value: 'Q30M' }
	];

	$scope.optionsTpQtdHorasGravacao = [
		{ text: '1 Hora', value: 'Q1' }
		, { text: '2 Horas', value: 'Q2' }
		, { text: '3 Horas', value: 'Q4' }
		, { text: 'Mais que 4 horas', value: 'Q4M' }
	];

	$scope.optionsTpQtdLigacoesConcorrentes = [
		{ text: 'Até 4', value: 'Q4' }
		, { text: 'Até 8', value: 'Q8' }
		, { text: 'Até 12', value: 'Q12' }
		, { text: 'Até 16', value: 'Q16' }
		, { text: 'Mais que 16', value: 'Q16M' }
	];

	$scope.optionsTpSimNao = [
		{ text: 'Sim', value: true }
		, { text: 'Não', value: false }
	];
});