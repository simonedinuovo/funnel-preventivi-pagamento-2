angular.module("azDirectCommon.dataModelModule", [])
.factory('dataModel', function(){
	  var Configs = {}
  	Configs.constant  = 
  	            {
  	                        defaultArray : [],
  	                        defaultObject : {},
  	                        defaultString : "",
  	                        defaultBool : false,
  	                        defaultNumber : 0
  	            };
	var Model =  function() {
		this.Quotation = function () {
			var intrnlConst = Configs.constant;
			this.policies = intrnlConst.defaultArray; // Array of Policy;
			this.persons = intrnlConst.defaultArray; // Array of Person
			this.vehicle = intrnlConst.defaultObject; // Type of Vehicle
		};
		this.Policy = function () {
			var intrnlConst = Configs.constant;
			this.paymentFrequency = intrnlConst.defaultString;
			this.netPremium = intrnlConst.defaultString;
			this.grossPremium = intrnlConst.defaultString;
			this.partyInCharge = intrnlConst.defaultString;
			this.name = intrnlConst.defaultString;
			this.code = intrnlConst.defaultString;
			this.ID = intrnlConst.defaultString;
			this.assignementReason = intrnlConst.defaultString;
			this.gainability = intrnlConst.defaultString;
			this.ssnPremium = intrnlConst.defaultString;
			this.taxPremium = intrnlConst.defaultString;
			this.reduction = intrnlConst.defaultObject; // Type of Reduction
			this.coverages = intrnlConst.defaultArray; // Array of Coverage
		};
		this.Coverage = function () {
			var intrnlConst = Configs.constant;
			this.name = intrnlConst.defaultString;
			this.netPremium = intrnlConst.defaultString;
			this.grossPremium = intrnlConst.defaultString;
			this.gainable = intrnlConst.defaultString;
			this.salable = intrnlConst.defaultString;
			this.guaranteeCode = intrnlConst.defaultString;
			this.selection = intrnlConst.defaultObject; //Type of Selection 
			this.reduction = intrnlConst.defaultObject; //Type of CoverageReduction
			this.coverageInterval = intrnlConst.defaultObject; //Type of CoverageInterval
			this.limitations = intrnlConst.defaultArray; //Array of  Limitation
		};
		this.Selection  = function () {
			var intrnlConst = Configs.constant;
			this.selected = intrnlConst.defaultBool;
		};
		this.Reduction = function () {
			var intrnlConst = Configs.constant;
			this.type = intrnlConst.defaultString;
			this.value = intrnlConst.defaultString;
		};
		this.CoverageReduction = function () {
			var intrnlConst = Configs.constant;
			this.type = intrnlConst.defaultString;
			this.value = intrnlConst.defaultString;
			this.percDiscountCluster = intrnlConst.defaultString;
			this.dateClusterDiscountVal = intrnlConst.defaultString;
			this.percDiscountClusterCur = intrnlConst.defaultString;
			this.percDiscountClusterNotCur = intrnlConst.defaultString;
			this.amountClusterDiscountNotCur = intrnlConst.defaultString;
		};
		this.Limitation = function () {
			var intrnlConst = Configs.constant;
			this.typology = intrnlConst.defaultString;
			this.value = intrnlConst.defaultString;
			this.description = intrnlConst.defaultString;
		};
		this.Selection  = function () {
			var intrnlConst = Configs.constant;
			this.selected = intrnlConst.defaultBool;
		};
		this.Person = function () {

			var intrnlConst = Configs.constant;
			this.occupation = intrnlConst.defaultString;
			this.dateOfBirth = intrnlConst.defaultString;
			this.gender = intrnlConst.defaultString;
			this.roleCode = intrnlConst.defaultString;
			this.mainFlag = intrnlConst.defaultString;
			this.addresses = intrnlConst.defaultArray; // Array of Address
		};
		this.Address = function () {
			var intrnlConst = Configs.constant;
			this.city = intrnlConst.defaultString;
			this.zipCode = intrnlConst.defaultString;
			this.type = intrnlConst.defaultString;
			this.localityCode = intrnlConst.defaultString;
			this.province = intrnlConst.defaultString;
		};
		this.Vehicle = function () {
			var intrnlConst = Configs.constant;
			this.usage = intrnlConst.defaultString;
			this.lastTwoYearsClaims = intrnlConst.defaultString;
			this.lastYearClaims = intrnlConst.defaultString;
			this.licensePlateNumber = intrnlConst.defaultString;
			this.initialRegistrationDate = intrnlConst.defaultString;
			this.driverFormula = intrnlConst.defaultString;
			this.bersaniRelief = intrnlConst.defaultString;
			this.lastYearsLloydClaims = intrnlConst.defaultString;
			this.lloydClass = intrnlConst.defaultDate;
			this.characteristics = intrnlConst.defaultObject; // Type of Characteristics
		};
		this.Characteristics = function () {
			var intrnlConst = Configs.constant;
			this.propertyType = intrnlConst.defaultString;
			this.vehicleType = intrnlConst.defaultString;
			this.originalPrice = intrnlConst.defaultNumber;
			this.power = intrnlConst.defaultString;
			this.cubicCapacity = intrnlConst.defaultString;
			this.vehicleBrand = intrnlConst.defaultString;
			this.vehicleModel = intrnlConst.defaultString;
			this.fuelType = intrnlConst.defaultString;
			this.alarmProtection = intrnlConst.defaultBool;
			this.box = intrnlConst.defaultString;
			this.mileage = intrnlConst.defaultNumber;
			this.stateOfBirthCode = intrnlConst.defaultNumber;
			this.flagOfficialEdition = intrnlConst.defaultString;
			this.progModelBrand = intrnlConst.defaultString;
			this.modelCode = intrnlConst.defaultString;
			this.plateType = intrnlConst.defaultString;
			this.flagGpl = intrnlConst.defaultString;
			this.taxHorsepower = intrnlConst.defaultNumber;
		};
	};
	
	return Model;
});

/*
	WebWidget.WidgetModel = new WebWidget.Model();
	 
	var person = new WebWidget.WidgetModel.Person();
	person.gender = "male";
	person.roleCode  = "0003";
	person.mainFlag = "F";
	 
	var address = new WebWidget.WidgetModel.Address();
	address.city = "milano";
	address.zipCode = "20139";
	address.localityCode ="0254";
	address.province ="MI";
	 
	person.addresses = [] ;
	person.addresses.push(address);
	 
	var modello = new WebWidget.WidgetModel.Quotation();
	 
	modello.vehicle = new WebWidget.WidgetModel.Vehicle();
	modello.vehicle.usage = "donno";
	modello.vehicle.lastTwoYearsClaims = "3";
	modello.vehicle.lastYearClaims = "3";
	modello.vehicle.licensePlateNumber = "ac 45345";
	modello.vehicle.driverFormula = "A";
	modello.vehicle.characteristics = new WebWidget.WidgetModel.Characteristics();
	modello.vehicle.characteristics.propertyType = "donno";
	modello.vehicle.characteristics.vehicleType = "auto";
	modello.vehicle.characteristics.originalPrice = 2344234;
	modello.vehicle.characteristics.power = "50kw";
	modello.vehicle.characteristics.cubicCapacity = "3300";
	modello.vehicle.characteristics.vehicleBrand = "FIAT";
	modello.vehicle.characteristics.vehicleModel = "Punto serie 3";
	modello.vehicle.characteristics.fuelType = "Gasoline";
	modello.vehicle.characteristics.alarmProtection = true;
	modello.vehicle.characteristics.box = "s";
	modello.vehicle.characteristics.mileage = "258458";
	modello.vehicle.characteristics.stateOfBirthCode = 58;
	 
	 
	modello.persons = [];
	modello.persons.push(person);
	            console.log(modello);
*/