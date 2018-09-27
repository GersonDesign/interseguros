<template lang="pug">
  v-container
    .cotizacion
      figure
        img(src="../assets/logo.png")
      v-layout.cotizacion-title
        h1 Cotizador de seguro de viajes
      .cotizacion-paso1(v-show="frmPaso1")
        v-form(ref="form", v-model="valid", lazy-validation)
          v-layout(row justify-space-between wrap)
            v-flex(md6, xs12)
              v-autocomplete(v-model="destinations", :items="itemDestinations", label="Seleccionar destino", :rules="destinationsRules")
            v-flex(md5, xs12)
              v-text-field(label="Números de pasajeros", v-model="passengers", :rules="passengerspRules", maxlength="3")
          v-layout(row justify-space-between wrap)
            v-flex(md6, xs12)
              v-text-field(label="Fecha partida (dd/mm/yyyy)", v-model="splitDate", :rules="splitDateRules", maxlength="10", mask="##/##/####", return-masked-value)
            v-flex(md5, xs12)
              v-text-field(label="Fecha retorno (dd/mm/yyyy)", v-model="returnDate", :rules="returnDateRules", maxlength="10", mask="##/##/####", return-masked-value)
          v-layout(row justify-space-between wrap)
            v-flex(md12)
              v-btn(:disabled="!valid",large, color="success", @click="registerQuote").cotizacion-btn Cotizar
      .cotizacion-paso2(v-show="frmPaso2")
        v-layout(row).cotizacion-paso2-title
          v-layout
            v-flex(md4)
            v-flex(v-for="item in coberturas", md4)
              h2 S/. {{item.tipo_plan}}
              h3 S/. {{item.precio_plan}}

        .cotizacion-paso2-descrip
          v-layout.cotizacion-paso2-descrip-cobertura
            v-flex(v-for="itemD in corberturasDescrip")
              h3 {{itemD.text}}
          v-layout(v-for="subItem in coberturas", column)
            v-flex(v-for="cara in subItem.caracteristicas").cotizacion-paso2-descrip-check
                v-checkbox(v-model="cara.aplica", align="center")





</template>
<script>
import {s_destino, s_cotizar} from '@/services'

export default {
  name: "Cotizacion",
  data: () => ({
    frmPaso1: true,
    frmPaso2: false,
    valid: false,
    destinations: [],
    itemDestinations: [],
    destinationsRules: [
      v => !!v || 'Escoga un destino'
    ],
    passengers: '',
    passengerspRules: [
      v => !!v || 'Ingrese números de pasajeros'
    ],
    splitDate: '',
    splitDateRules: [
      v => !!v || 'Coloque una fecha de partida'
    ],
    returnDate: '',
    returnDateRules: [
      v => !!v || 'Coloque una fecha de retorno'
    ],
    txtPlanEstandar: '',
    txtPlanPremiun: '',
    coberturas: [],
    corberturasDescrip: [
      {
        'text': 'Cobertura 1'
      },
      {
        'text': 'Cobertura 2'
      },
      {
        'text': 'Cobertura 3'
      },
      {
        'text': 'Cobertura 4'
      },
      {
        'text': 'Cobertura 5'
      },
      {
        'text': 'Cobertura 6'
      }

    ]
  }),
  created(){
    this.obtenerDestinos()
  },
  methods: {
    obtenerDestinos(){
      s_destino().then(rest=>{
        this.itemDestinations = rest.data
      })
    },
    registerQuote(){
      if(this.$refs.form.validate()){
        s_cotizar({
          destino: this.destinations,
          cantidad_pasajeros: this.passengers,
          fecha_partida:this.splitDate,
          fecha_retorno: this.returnDate
        }).then(rest=>{
          console.log('cotizacion',rest);
          this.coberturas = rest.data
          this.frmPaso1 =  false
          this.frmPaso2 = true
        }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '../assets/stylus/estilos'
</style>
