angular.module('azDirectCore.validationModule')

/**
 * @ngdoc service
 * @name azDirectCore.validationModule.fiscalCode
 *
 * @description The fiscalCode contains function that help during develop with Date;
 * */
	.factory('fiscalCode', function () {


		var encode_month = ['A','B','C','D','E','H','L','M','P','R','S','T'];
		var encode_omocodia =  ['L','M','N','P','Q','R','S','T','U','V'];

		var checksum_table_odd = {
			0:1, 1:0, 2:5, 3:7, 4:9, 5:13, 6:15, 7:17, 8:19,
			9:21, A:1, B:0, C:5, D:7, E:9, F:13, G:15, H:17,
			I:19, J:21, K:2, L:4, M:18, N:20, O:11, P:3, Q:6,
			R:8, S:12, T:14, U:16, V:10, W:22, X:25, Y:24, Z:23
		};
		var checksum_table_even = {
			0:0, 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8,
			9:9, A:0, B:1, C:2, D:3, E:4, F:5, G:6, H:7,
			I:8, J:9, K:10, L:11, M:12, N:13, O:14, P:15, Q:16,
			R:17, S:18, T:19, U:20, V:21, W:22, X:23, Y:24, Z:25
		};

		var checksum_table =  "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		var checksum = function(codice_fiscale)
		{
			var i,val=0;
			for(i=0;i<15;i++)
			{
				var c=codice_fiscale[i].toUpperCase();
				if(i%2)
					val+=checksum_table_even[c];
				else
					val+=checksum_table_odd[c];
			}
			val=val%26;
			return checksum_table.charAt(val);
		};
		var omocodia = function(codice_fiscale,indice_omocodia)
		{
			var cifre_disponibili=[14,13,12,10,9,7,6];
			var cifre_da_cambiare=[];
			while ( indice_omocodia>0 && cifre_disponibili.length)
			{
				var i=indice_omocodia%cifre_disponibili.length;
				indice_omocodia=Math.floor(indice_omocodia/cifre_disponibili.length);
				cifre_da_cambiare.push(cifre_disponibili.splice(i-1,1)[0]);
			}
		};

		var soloConsonanti = function(str)
		{
			return str.replace(/[^BCDFGHJKLMNPQRSTVWXYZ]/gi,'');
		};

		var soloVocali = function(str)
		{
			return str.replace(/[^AEIOU]/gi,'')
		};

		return {
			/**
			 * @ngdoc method
			 * @name encode_surname
			 * @methodOf azDirectCore.validationModule.fiscalCode
			 *
			 * @description
			 * This method give the encoding of surname for calculate fiscal code, for example :
			 * <pre>
			 *
			 *     console.log(fiscalCode.encode_surname("Rossi");
			 *
			 *     //will print "RSS"
			 *
			 * </pre>
			 *
			 * @param {string} surname Surname from which will be calculated from the respective portion of the fiscal code.
			 *
			 * @return {string} Partial string of fiscal code
			 *
			 *
			 */
			encode_surname : function(surname)
			{
				var r=soloConsonanti(surname);
				r+=soloVocali(surname);
				r+='XXX';
				r=r.substr(0,3);
				return r.toUpperCase();
			},

			/**
			 * @ngdoc method
			 * @name encode_name
			 * @methodOf azDirectCore.validationModule.fiscalCode
			 *
			 * @description
			 * This method give the encoding of namer for calculate fiscal code, for example :
			 * <pre>
			 *
			 *     console.log(fiscalCode.encode_name("Mario");
			 *
			 *     //will print "MRA"
			 *
			 * </pre>
			 *
			 * @param {string} name Name from which will be calculated from the respective portion of the fiscal code.
			 *
			 * @return {string} Partial string of fiscal code
			 *
			 *
			 */
			encode_name : function(name)
			{
				var r=soloConsonanti(name);
				if(r.length>=4)
				{
					r=
						r.charAt(0)+
						r.charAt(2)+
						r.charAt(3);
				}
				else
				{
					r+=soloVocali(name);
					r+='XXX';
					r=r.substr(0,3);
				}
				return r.toUpperCase();
			},

			/**
			 * @ngdoc method
			 * @name encode_data
			 * @methodOf azDirectCore.validationModule.fiscalCode
			 *
			 * @description
			 * This method give the encoding of birthdate for calculate fiscal code, for example :
			 * <pre>
			 *
			 *     console.log(fiscalCode.encode_data(31,05,1992,"M");
			 *
			 *     //will print "31E92"
			 *
			 * </pre>
			 *
			 * @param {number} gg Day of birthdate
			 * @param {number} mm Month of birthdate (NB: starting from 0 as month of Data js obj)
			 * @param {number} aa Year of birthdate
			 * @param {string} sex Sex of person
			 *
			 * @return {string} Partial string of fiscal code
			 *
			 *
			 */
			encode_data : function(gg,mm,aa,sex)
			{
				var d=new Date();
				d.setYear(aa);
				d.setMonth(mm);
				d.setDate(gg);
				var anno="0"+d.getFullYear();
				anno=anno.substr(anno.length-2,2);
				//var mese=this.encode_month[d.getMonth()];	//Sembra che la primitiva getMonth non si capisce come mai per giugno restituisca 6 per agosto 7 ad es.
				if (mm.length ==2 && mm.substr(0,1)=="0")
				{
					mm=mm.substr(1,1);
				}
				var mese=encode_month[mm];
				var giorno=d.getDate();
				if(sex.toUpperCase()=='F') giorno+=40;
				giorno="0"+giorno;
				giorno=giorno.substr(giorno.length-2,2);
				return ""+anno+mese+giorno;
			},

			/**
			 * @ngdoc method
			 * @name encode_comune
			 * @methodOf azDirectCore.validationModule.fiscalCode
			 *
			 * @description
			 * This method give the Catastal code for calculate fiscal code if valid, for example :
			 * <pre>
			 *
			 *     console.log(fiscalCode.encode_comune(31,05,1992,"M");
			 *
			 *     //will print "31E92"
			 *
			 * </pre>
			 *
			 * @param {number} comune_pattern Catastal code of birth city
			 *
			 * @return {string} Catastal code string of fiscal code or empty string if not valid
			 *
			 *
			 */
			encode_comune :function(comune_pattern)
			{
				if (!comune_pattern) return;
				if(comune_pattern.match(/^[A-Z]\d\d\d$/i)) return comune_pattern;
				return "";
			},

			/**
			 * @ngdoc method
			 * @name calculate
			 * @methodOf azDirectCore.validationModule.fiscalCode
			 *
			 * @description
			 * This method give the Fiscal code, for example :
			 * <pre>
			 *
			 *     console.log(fiscalCode.calculate("mario", "rossi", 31, 05, 1992, "M", "H501");
			 *
			 *     //will print "RSSMRA92E31H501J"
			 *
			 * </pre>
			 *
			 * @param {string} nome Person's name from which generate fiscal code
			 * @param {string} surname Person's surname from which generate fiscal code
			 * @param {string} gg Person's day of birthdate from which generate fiscal code
			 * @param {string} mm Person's month of birthdate from which generate fiscal code  (NB: starting from 0 as month of Data js obj)
			 * @param {string} aa Person's year of birthdate from which generate fiscal code
			 * @param {string} place Person's birthplace from which generate fiscal code
			 *
			 * @return {string} Fiscal code
			 *
			 *
			 */
			calculate :function(name,surname,sex,gg,mm,aa,place)
			{
				var codice=
					this.encode_surname(surname)+
					this.encode_name(name)+
					this.encode_data(gg,mm,aa,sex)+
					this.encode_comune(place);
				console.log("giorno : "+gg +" mese : "+mm + " anno : "+aa);
				console.log("surname : "+this.encode_surname(surname) +" name : "+ this.encode_name(name) + " place : "+ this.encode_comune(place));
				console.log(codice);
				var resto = checksum(codice);
				console.log(resto);
				codice+= checksum(codice);
				
				return codice;
			}
		};
	});
