var mainApp = angular.module('mainApp');

mainApp.controller('vendaCentralController', function ($state, $scope, $http) {
	const BASE_URL = 'venda-central';
	const BASE_URL_EQUIPAMENTO_CENTRAL = 'equipamento-central';
	$scope.message = "$scope.message : from vendaCentralController";
	$scope.vendaCentral = {};

	// busca lista de vendaCentral
	$scope.findCasos = function () {
		$http.get(BASE_URL + '/api/find').then(
			function (response) {
				$scope.listVendaCentral = response.data;
			}, function (error) {
				console.log('Error: ' + error.data);
			});
	}
	$scope.findCasos();

	$http.get(BASE_URL_EQUIPAMENTO_CENTRAL + '/api/all-marcas').then(
		function (response) {
			$scope.listMarcas = response.data;
		}, function (error) {
			console.log('Error: ' + error.data);
		});

	$scope.changeMarca = function () {
		$scope.vendaCentral.equipamentoIndicado.dsEquipamento = null
		$http.get(BASE_URL_EQUIPAMENTO_CENTRAL + '/api/equipamentos-by-marca/' + $scope.vendaCentral.equipamentoIndicado.tpMarca).then(
			function (response) {
				$scope.listEquipamentos = response.data;
				console.log($scope)
			}, function (error) {
				console.log('Error: ' + error.data);
			});
	}

	$scope.createVendaCentral = function () {
		$scope.listErros = []
		if (isTodosCamposPreenchidos($scope.vendaCentral)) {
			$http.post(BASE_URL + '/api/create', $scope.vendaCentral).then(
				function (response) {
					$scope.vendaCentral = {}; // clear the form so our user is ready to enter another
					$scope.listVendaCentral = response.data;
					console.log(response);
				}, function (error) {
					console.log('Error: ' + error.data);
				});
		} else {
			$scope.listErros.push({ text: 'Existem campos não preenchidos!' })
		}
	}

	$scope.vizualizarCaso = function (vendaCentral) {
		$scope.vendaCentralDetalhar = vendaCentral;
		$('#modal-caso').modal('toggle');

	}

	isTodosCamposPreenchidos = function (vendaCentral) {
		console.log(vendaCentral)
		if (vendaCentral.equipamentoIndicado == null || vendaCentral.equipamentoIndicado.tpMarca == null || vendaCentral.equipamentoIndicado.dsEquipamento == null) { return false };
		if (vendaCentral.tpQtdFuncionarios == null) { return false };
		if (vendaCentral.tpQtdLigacoesConcorrentes == null) { return false };
		if (vendaCentral.tpQtdToquesSimultaneos == null) { return false };
		if (vendaCentral.blDdr == null) { return false };
		if (vendaCentral.blPriorizaSolucao == null) { return false };
		if (vendaCentral.blComputadorAtendente == null) { return false };
		if (vendaCentral.blSecretariaEletronica == null) { return false };
		if (vendaCentral.blFuncaoRonda == null) { return false };
		if (vendaCentral.blFluxoAltoFiliais == null) { return false };
		if (vendaCentral.blFuncionarioRamalCelular == null) { return false };

		return true;
	}

	$scope.deleteVendaCentral = function (id) {
		$http.delete(BASE_URL + '/api/delete/' + id).then(
			function (response) {
				$scope.listVendaCentral = response.data;
			}, function (error) {
				console.log('Error: ' + error.data);
			});
		$('#modal-caso').modal('hide')
	}

	$scope.optionsTpQtdFuncionarios = [
		{ text: '12 pessoas', value: 'Q12' }
		, { text: '32 pessoas', value: 'Q32' }
		, { text: '64 pessoas', value: 'Q64' }
		, { text: '128 pessoas', value: 'Q128' }
		, { text: 'Mais que 128 pessoas', value: 'Q128M' }
	];

	$scope.resolveDominio = function (codigo, options) {
		if (codigo && options && options.length) {
			return options.find((tp) => tp.value == codigo).text;
		}
		return "";
	}

	$scope.optionsTpQtdToquesSimultaneos = [
		{ text: 'Até 6', value: 'Q6' }
		, { text: 'Até 10', value: 'Q10' }
		, { text: 'Até 30', value: 'Q30' }
		, { text: 'Mais que 30', value: 'Q30M' }
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