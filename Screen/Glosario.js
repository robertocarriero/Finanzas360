import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { Text, Card } from "react-native-paper";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;


const pages = [
  {
    title: "Glosario de Términos Financieros",
    imageUrl: require("../assets/Aprendiendo.jpg"),
  },
  {
    content:  
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  A</Text> {"\n\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción: </Text> 
        Valor negociable que representa una participación en una sociedad comercial.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción de participación:</Text> 
        Valor negociable que representa una participación en el capital pero no tiene derecho de voto.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción Escritural: </Text>
        Valor negociable que se encuentra representado en una cuenta a nombre del titular.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción Ordinaria: </Text>
        Valor negociable que otorga derechos políticos y económicos en igual proporción a su participación en el capital 
        social.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción Preferida: </Text>
        Es el valor negociable que otorga una preferencia económica o dividendo de cobro preferente. 
        Generalmente carecen de derecho de voto.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción Rescatable: </Text>
        Valor negociable cuya compra total o parcial por la emisora o un tercero está fijado en las condiciones de emisión.{"\n"}
    </Text>,
    
  },
  {
    content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Acción Líderes: </Text>
        Son aquellas acciones que componen el Índice MERVAL y que como consecuencia de ello guardan características
        particulares vinculadas con la participación de las mismas en la cantidad de transacciones y en el monto total
        operado en la Bolsa de Comercio de Buenos Aires.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Activo Financiero: </Text>
        Son aquellos títulos valores ‐ emitidos por entidades públicas o privadas ‐ con la finalidad de obtener
        financiamiento del público para la realización de sus actividades 
        (ej.las acciones, títulos valores de renta fija, etc.).{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Activo Financiero de Renta Fija: </Text>
        Representa para su titular un derecho a percibir en el futuro un flujo de fondos cierto y a una fecha 
        preestablecida cuando la tasa de interés del activo es fija.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Activo Financiero de Renta Variable: </Text>
        Representa para su titular un derecho a participar en los resultados del negocio de la emisora.
        No tienen vencimiento y los flujos futuros de fondos son inciertos.{"\n"}
    </Text>
    
  },
  {
    content:    
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Activo Libre de Riesgo: </Text>
        Valor negociable cuyo emisor dispone de una reputación favorable y de una evidente voluntad y capacidad de pago, 
        de modo que ninguna persona del público inversor dudará del pago en su vencimiento. En general, 
        son los bonos del tesoro norteamericano. Activo: Conjunto de bienes y derechos pertenecientes a una persona 
        jurídica o física.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>A D R : </Text>
        American Depositories Receipts es un título físico que respalda el depósito en un banco estadounidense de acciones 
        de compañías cuyas sociedades fueron constituidas fuera de aquel país, de manera de poder transar las acciones de
        la compañía como si fueran cualquiera otra de ese mercado. De esta forma, el mecanismo de ADR permite a una
        empresa extranjera emitir acciones directamente en la bolsa norteamericana.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Agentes Colocadores: </Text>
        Agentes Colocadores, son las entidades y/o sujetos autorizados por la CNV para promocionar y comercializar 
        cuotapartes de los fondos.{"\n"}
    </Text>,
  },
  {
    content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Ahorro: </Text>
        Diferencia entre el ingreso disponible y el consumo efectuado por una persona física o jurídica, 
        pudiendo esta última ser pública o privada. Consiste en guardar una parte de los ingresos y reservarla 
        para su uso futuro o para su capitalización.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>AMortización: </Text>
        Es el pago de capital que se va produciendo en la vida del título de deuda.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>A P R: </Text>
        Activos Ponderados por Riesgo.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Asamblea: </Text>
        Es la reunión de los socios para tratar los temas indicados en la convocatoria donde cada accionista ejerce 
        sus derechos políticos.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Autorización de Oferta Pública: </Text>
        Autorización otorgada por la Comisión Nacional de Valores a los valores negociables cuyos emisores
        han cumplido con los requisitos establecidos en materia de información.{"\n"}
    </Text>
  },
  {
    content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  B</Text> {"\n\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>BADLAR: </Text> 
        Tasa de interés pagada por depósitos a plazo fijo de más de un millón de pesos, por el promedio 
        de entidades financieras.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>BCRA: </Text> 
        Banco Central de la República Argentina	Entidad autárquica del Estado Nacional regida por las
        disposiciones de su Carta Orgánica y demás normas legales concordantes.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>BCBA: </Text>
        Bolsa de Comercio de Buenos Aires .{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Benchmark: </Text>
        Punto de referencia con el objeto de realizar comparaciones de performance entre activos financieros.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Bid/ask Prices: </Text>
        Precios de demanda y oferta determinantes de la cotización de un valor. Bid es el precio más alto
        que el comprador está dispuesto a pagar; y ask es el precio más bajo al cual el vendedor está dispuesto 
        a vender. La diferencia entre ambos se denomina spread, margen o diferencia de precios.{"\n"}
    </Text>
  },
  {
    content:   
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Bolsa de Valores: </Text>
        La Bolsa de Valores es una organización privada que brinda las facilidades necesarias para que 
        sus miembros, atendiendo los mandatos de sus clientes, introduzcan órdenes y realicen negociaciones
        de compra y venta de valores, tales como acciones de sociedades o compañías anónimas, bonos públicos 
        y privados, certificados, títulos de participación y una amplia variedad de instrumentos de inversión.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Bovespa: </Text>
        Bolsa de Valores del Estado de San Pablo .{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Bono: </Text>
	    Es un instrumento de deuda a través del cual un inversor presta dinero a una empresa o gobierno el cual 
        le es devuelto a una tasa (que puede ser fija o variable) en pagos que se realizaran en una fecha 
        determinada.     
    </Text>,
  },
  {
    content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  C</Text> {"\n\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>CAFCI: </Text> 
        Cámara Argentina de Fondos Comunes de Inversión. Es una Asociación Civil creada por las GERENTES de FONDOS
        , cuya misión es difundir y afianzar el conocimiento sobre los FONDOS, preservar la integridad de la 
        industria y salvaguardar la confianza de los inversores.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Calificaciones de Riesgo: </Text>
        Son opiniones independientes que emiten las Capital de Solvencia Obligatorio (SCR  Solvency Capital Requirement) sobre la capacidad de pago de un emisor de
        sus obligaciones negociables y/u otros valores negociables de deuda.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Cámaras de Compensación: </Text>
        Son entidades por medio de las cuales los bancos u otros organismos autorizados por el BCRA, 
        acuerdan intercambiarse medios de pagos y otras obligaciones financieras.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Capacidad Crediticia: </Text>
        Es la probabilidad de que la organización emisora pueda repagar la deuda en las condiciones acordadas.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Capital Productivo: </Text> 
        El capital productivo es uno de los factores de producción de la economía. Está constituido 
        principalmente por diversos activos (entre ellos inmuebles, equipos y maquinarias o instalaciones 
        de cualquier género u otros bienes) que pueden formar parte del proceso de producción de otros bienes 
        (ya sean de consumo, intermedios o de capital). El Capital Financiero es toda suma de dinero no consumida 
        sino trasladada a un mercado financiero.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Capitalización Bursatil: </Text> 
        Con referencia a una compañía determinada, representa el valor de mercado de las acciones que integran 
        su capital. Con referencia a una bolsa, es el valor de mercado de la totalidad de las acciones ordinarias 
        y preferidas, coticen o no coticen. El importe, en el primer caso, surge de efectuar el producto del 
        capital por el precio de la compañía, en tanto que en el segundo se efectúa la sumatoria de los valores 
        que corresponden individualmente a todas las sociedades cotizantes.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Caución Bursatil REBO: </Text> 
        La caución bursátil es un pase en el cual el precio de venta al contado es inferior al de cotización y
        resulta de los aforos que fija periódicamente el Merval, siendo además el precio de la venta a plazo, 
        superior al de la venta al contado.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>CDS: </Text> 
        Credit Default Swaps (Instrumento de Cobertura de Riesgo Crediticio){"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>CEDEAR: </Text>
        Son certificados representativos de depósito de acciones de sociedades extranjeras u otros valores, 
        sin autorización de oferta pública en nuestro país. Quedan en custodia en la Caja de Valores y se 
        pueden negociar como cualquier acción.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>CEVA: </Text>
        Son certificados de valores que representan una cartera fija de especies (por ejemplo acciones,
        títulos públicos y otros, o estos instrumentos combinados) con cotizacón en la Bolsa, seleccionados 
        de acuerdo con un índice o categorización.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Cheque: </Text>
        Orden de pago emitida contra un Banco en el que el librador tiene una cuenta corriente o autorización para girar 
        en descubierto.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Clases de Cuotapartes: </Text> 
        son los distintos tipos de cuotapartes que pueden existir dentro de un mismo fondo. Se diferencian 
        entre sí por las comisiones que les sean aplicables, la propia política de comercialización o de otros
        aspectos como el volumen de inversión, la política de distribución de resultados o la divisa de 
        denominación.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Comisión Nacional de Valores (CNV): </Text> 
        Es una entidad autárquica con jurisdicción en toda la República. Su objetivo es otorgar la oferta pública 
        velando por la transparencia de los mercados de valores y la correcta formación de precios en los mismos,
        así como la protección de los inversores.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Comisiones de Rescate: </Text>
        Comisiones de rescate, se pueden aplicar cuando el cuotapartista procede a solicitar y gestionar el 
        rescate de toda o parte de sus cuotapartes en el Fondo y se deducen del monto rescatado.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Comisiones de Suscripción: </Text>
        Comisiones de suscripción, se pueden aplicar cuando el cuotapartista ingresa en un fondo y representan un
        porcentaje sobre el monto que se suscribe.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Costo de Endeudamiento: </Text> 
        Intereses y otros gastos en que se incurre, para la obtención de fondos prestados por terceros.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Costo de Oportunidad: </Text> 
        El valor de la mejor de aquellas alternativas no elegidas al decidir dedicar recursos escasos a un 
        propósito y no al otro.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Costo Financiero Total: </Text>
        Es el costo total de un crédito y que incluye, además de la tasa de interés, todos aquellos cargos
        asociados, cualquiera sea su concepto.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Cuotas Partes: </Text>
        Cuotapartes de los fondos abiertos y cerrados, son valores negociables y representan el derecho de 
        copropiedad indiviso de los cuotapartistas sobre el patrimonio del fondo{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Cuotapartistas: </Text>
        Cuotapartistas son los inversores del fondo, que pueden ser personas físicas o jurídicas
        cuotapartes por cualquiera de las modalidades de captación implementadas por el fondo involucrado, 
        momento en el que adhieren de pleno derecho al reglamento y son inscriptos en el registro de 
        cuotapartistas correspondiente.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  D</Text> {"\n\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Depósito a Plazo Fijo: </Text> 
        es la entrega de una suma de dinero a un banco o entidad por un período de tiempo en el cual el
        cliente no puede retirar la suma y donde la entidad se compromete a devolver la suma depositada más 
        el interés pactado al finalizar el período. Depósitos: Son colocaciones de dinero que realizan las 
        familias, las empresas o el gobierno en los bancos, a cambio de una rentabilidad o ganancia (interés).{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Derecho de Acrecer: </Text> 
        Derecho de incrementar las tenencias en proporción a las acciones ya suscriptas en una emisión de acciones.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Derecho de Suscripción Preferente: </Text>
        Derecho que tiene el accionista en suscribir en forma preferencial una emisión de acciones.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Derivados: </Text>
        Un derivado financiero o instrumento derivado es un producto financiero cuyo valor se basa en el precio de otro activo.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Diversificación	: </Text> 
        Diversificar significa invertir en una variedad de activos financieros a efectos de reducir el riesgo.
         Dado que las distintas inversiones no se mueven en la misma dirección en sintonía al diversificar se 
         reduce el riesgo de lo que se ha invertido.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dividend Yield: </Text> 
        Rentabilidad por dividendos. Es la relación entre lo que paga una empresa en dividendos y el valor de la acción. Surge de dividir 
        los dividendos pagados en un año por el precio al que se pagó la acción.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dividendo: </Text>
        Derecho económico que otorga cada acción a cobrar en el reparto de utilidades del ejercicio{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dividendo en Acciones: </Text>
        Dividendo que se abona en forma de acciones.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dividendo en Efectivo: </Text>
        Es el pago en dinero de la utilidad del ejercicio proporcional a la participación en el capital social.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dólar Blue: </Text> 
        El dólar blue, dólar paralelo o dólar negro, son eufemismos que se utilizan en Argentina para referirse al dólar estadounidense comprado 
        ilegalmente en el mercado negro.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dólar MEp o Dólar  Bolsa: </Text> 
        El dólar MEP, o dólar Bolsa es el tipo de cambio que se obtiene por la compra de un bono en pesos 
        para su posterior venta en moneda norteamericana. Esta operación permite acceder a divisas de manera 
        legal y sin los topes que tiene el dólar oficial (US$200 por persona al mes y con una decena de 
        restricciones){"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dólar CCL: </Text> 
        El dólar CCL o dólar Contado con Liquidación es un tipo de cambio financiero utilizado ampliamente 
        en Argentina, junto con el dólar MEP. Esta modalidad permite el cambio de pesos por dólares a través 
        de la compra-venta de acciones o títulos de deuda que cotizan tanto en el país como en el exterior. 
        El dólar CCL se ha convertido en una opción atractiva para empresas e inversionistas, ya que les permite 
        adquirir divisas y sacarlas del país de forma legal.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dólar Tarjeta: </Text> 
        El dólar tarjeta es el tipo de cambio que se emplea para el pago de consumos con tarjeta de débito y 
        crédito en el exterior, así como para el abono de servicios por parte de empresas del exterior, como
        en el caso de las plataformas de streaming, como Netflix o Spotify. Este se aplica siempre y cuando el
        comprador no los absorba con dólares atesorados previamente.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Dólar Mayorista: </Text> 
        Conocido también como dólar intercambiario es la cotización del dólar que se utiliza en las
        operaciones "entre bancos", entidades financieras y empresas. El dólar mayorista es exclusivo
        para transacciones de gran volumen.
        Su valor se toma como referencia real del mercado y, por lo tanto, es crucial para determinar
        el tipo de cambio en el país. En la Argentina, lo utlizan bancos y entidades financieras, ya que es
        la base para las operaciones interbancarias. Los bancos compran y venden dólares entre sí a este tipo de
        cambio. Pero también es utilizado por las empresas exportadoras e importadoras lo utilizan para liquidar 
        sus operaciones de comercio exterior.{"\n"}
    </Text>
  },
  
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  E</Text> {"\n\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Endosar: </Text> 
        Endosar significa transferir un cheque a otra persona. Quien transfiere un cheque debe previamente 
        firmarlo en el dorso y colocar su nombre y apellidos completos, número de documento y domicilio, 
        (si se deposita, se le debe agregar el tipo y número de cuenta). Los cheques comunes pueden tener 
        sólo un endoso y los cheques de pago diferido hasta dos.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Entidad Autorregulada: </Text> 
        Bolsas de comercio autorizadas a cotizar valores negociables y a los mercados de valores adheridos.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Entidad financiera: </Text>
        Persona jurídica (privada o pública) cuya actividad típica consiste en la intermediación habitual entre 
        la oferta y la demanda de recursos financieros.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  F</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>FCI: </Text> 
        Fondos Comunes de Inversión. Un fondo común de inversión o fondo mutuo es una institución de inversión 
        colectiva que consiste en reunir fondos de distintos inversores, naturales o jurídicos, para invertirlos 
        en diferentes instrumentos financieros, responsabilidad que se delega a una sociedad administradora que 
        puede ser un banco o institución financiera. Los Fondos Comunes de Inversión pueden ser abiertos o 
        cerrados.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fideicomiso: </Text>
        Contrato por el cual una persona (fiduciante) transmite la propiedad fiduciaria de bienes determinados a 
        otra (fiduciario), quien se obliga a ejercerla en beneficio de quien se designe en el contrato 
        (beneficiario), y a transmitirlo al cumplimiento de un plazo o condición al fiduciante, al beneficiario 
        o al fideicomisario. El contrato debe individualizar al beneficiario, quien puede ser una persona física 
        o jurídica, que puede o no existir al tiempo del otorgamiento del contrato; en este último caso deben 
        constar los datos que permitan su individualización futura.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fideicomisos Financieros: </Text>
        Es un instrumento que le permite al inversor participar de un proyecto o de un
        cobro futuro determinado a través de una colocación de deuda o una participación de capital.
        De esta forma, comprando valores representativos de deuda de un fideicomiso, el inversor le presta
        dinero al fideicomiso con el fin de adelantar fondos a un proyecto o a un flujo futuro de pagos. 
        Durante el período de vigencia y hasta el vencimiento del título, el inversor va recibiendo la 
        devolución del dinero aportado más una tasa de interés pactada.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fideicomisario: </Text> 
        Es el destinatario final de los bienes fideicomitidos. 
        Fiduciante: Es quien agrupa y transmite los activos
        que conforman y son transferidos al fideicomiso financiero. Cuando los activos fideicomitidos están 
        conformados por créditos, el fiduciante generalmente mantiene para sí su administración, percibiendo a
        cambio una comisión.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fiduciante: </Text> 
        Es quien agrupa y transmite los activos que conforman y son transferidos al fideicomiso financiero.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fiduciario: </Text> 
        Es quien recibe los bienes en propiedad fiduciaria. Debe ser una entidad financiera o una sociedad 
        inscripta en el Registro de Fiduciarios Financieros.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fintech: </Text> 
        Deriva de las palabras “finance technology” y se utiliza para denominar a las empresas que ofrecen
        productos y servicios financieros, haciendo uso de tecnologías de la información y comunicación, 
        como páginas de internet, redes sociales y aplicaciones para celulares.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fondo Común de Inversión: </Text> 
        Fondo administrado por una sociedad sujeta a la regulación y supervisión de la Comisión Nacional de
        Valores que invierte en distintas clases de activos (plazos fijos, títulos, acciones, etc.).
        Los inversores participan del resultado -ganancias o pérdidas por la tenencia de activos del fondo. {"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fondos Comunes de Inversión Abiertos: </Text> 
        Fondos Comunes de Inversión Abiertos (en adelante fondos abiertos), son los fondos constituidos conforme el primer
        párrafo del artículo 21 de la ley, en los cuales, la cantidad de cuotapartes en circulación puede aumentar o disminuir 
        a lo largo de la vida del fondo, las cuotapartes pueden ser suscriptas y rescatadas a través de diferentes modalidades 
        de captación; el valor diario de las cuotapartes, considerado para la liquidación de suscripciones y rescates, será el 
        valor determinado todos los días hábiles bursátiles luego del horario de cierre de los mercados institucionalizados locales, 
        dividiendo el patrimonio del fondo por el número de cuotapartes en circulación; y en la administración del patrimonio se deben 
        respetar las restricciones y limitaciones que surgen de la ley, el decreto y las normas dictadas por la Comisión.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Fondos Comunes de Inversión Cerrados: </Text> 
        Fondos Comunes de Inversión Cerrados (en adelante fondos cerrados), son los fondos constituidos conforme el segundo 
        párrafo de los artículos 1º y 21 de la ley, los cuales funcionan con una cantidad máxima de cuotapartes; las cuotapartes 
        se negocian en un mercado institucionalizado organizado y autorizado como entidad autorregulada, y en este sentido, 
        el inversor puede adquirirlas o venderlas en este ámbito a lo largo de la vida del fondo; el valor de las cuotapartes 
        surge de la oferta y demanda involucradas en las operaciones de compra o venta que se realicen en el mercado institucionalizado 
        donde se negocien; y tienen permitido la realización de objetos de inversión especiales, pudiendo integrar el patrimonio 
        con conjuntos homogéneos o análogos de bienes reales o personales, o derechos creditorios con garantías reales o sin ellas, 
        que pueden implicar excepciones a estas restricciones.{"\n"}
    </Text>
  },
  {content:
    <Text>
      <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  I</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Indexación: </Text> 
        Mecanismo mediante el cual los precios o los pagos de un contrato se ajustan para reflejar las variaciones
        de algún índice.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Índice de Precios al Consumidor (IPC): : </Text> 
        Mide la evolución del costo de una canasta fija de bienes y servicios de consumo a lo largo del tiempo.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Interés: </Text> 
        Pagos por el uso de capital real o financiero en un lapso de tiempo, realizados por los usuarios del capital a sus
        dueños.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Interés Compuesto: </Text>
        Es el que se obtiene cuando al capital se le suman periódicamente los intereses producidos. Así al final de cada periodo 
        el capital que se tiene es el capital anterior más los intereses producidos por ese capital durante dicho periodo. {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Interés Simple: </Text>
        El interés simple es el que se obtiene cuando los intereses producidos, durante todo el tiempo que dure una inversión, 
        se deben únicamente al capital inicial. {"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  L</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>LEBAC: </Text> 
        Acrónimo de Letras del Banco Central. Son emisiones de deuda a corto plazo del Banco Central de la República Argentina 
        con el objeto de regular la cantidad de dinero de la economía. Estos títulos se emiten con descuento por lo que pagan tanto 
        los intereses como el capital al vencimiento{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>LIBOR: </Text> 
        London Interbank Offered Rate. Tasa de interés que cobran los bancos a otros bancos por sus créditos, en el mercado de Londres.
        Es usada como tasa de referencia en otros mercados.	{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Liquidez:: </Text> 
        Disponibilidad de dinero, o recursos rápidamente convertibles en efectivo, para afrontar compromisos a corto plazo.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  M</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Margen Financiero: </Text> 
        Ingresos menos egresos financieros. Comprende a los resultados por intereses y por activos, diferencias de 
        cotización y otros resultados financieros.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Maturity: </Text> 
        Se define como la vida remanente del bono o el período que falta para que el bono amortice totalmente.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Mercado Primario: </Text> 
        En este mercado las entidades emisoras colocan valores negociables por primera vez para financiar sus actividades.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Mercado Secundario: </Text>
        Es aquel en donde el inversor puede vender a otros inversores sus tenencias de valores negociables. 
        Un mercado secundario otorga liquidez a un valor negociable en la medida de la existencia de demanda de dichos títulos.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Merval: </Text>
        Mercado de Valores de Buenos Aires .{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  O</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Obligación: </Text> 
        Compromiso asumido por una persona frente a otra que puede surgir de una norma legal o un contrato.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Obligaciones Negociables: </Text> 
        Es un bono emitido por una empresa privada.
        Cuando una entidad privada necesita fondos los puede pedir prestados a través de la emisión de obligaciones negociables,
        ampliamente conocidas como ON. De esta forma, la sociedad contrae deuda con los obligacionistas, que son los inversores 
        que compraron esos títulos, y se compromete a cancelar esa deuda en el plazo pactado junto con el interés correspondiente.
        Cuando esta forma de financiamiento la utiliza un Estado, el instrumento se denomina bono o título público.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Obligaciones Negociables Convertibles	: </Text> 
        Obligaciones negociables con opción de ser convertidas en acciones de la propia empresa.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Oferta Pública de Títulos Valores: </Text> 
        Invitación que se hace a personas, sectores o grupos determinados para realizar cualquier acto jurídico con títulos 
        valores, efectuada por los emisores o por organizaciones dedicadas al comercio de aquéllos, por medio de ofrecimientos
        personales, publicaciones periodísticas, transmisiones radiotelefónicas o de televisión, proyecciones cinematográficas,
        colocación de afiches o carteles, programas, circulares y comunicaciones impresas o cualquier otro procedimiento de difusión.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Opción: </Text> 
        Contrato por el cual mediante el pago de una prima asegura el derecho (pero no la obligación) de comprar o vender un activo 
        dentro de un determinado plazo (si la opción es americana) o en cierta fecha (si la opción es europea) a un precio establecido
        inicialmente.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Operaciones de Mercado Abierto: </Text> 
        Son las compras y ventas de títulos públicos o propios que realiza el Banco Central para influir directamente sobre la liquidez
        de la economía y la estructura de las tasas de interés de los mercados financieros.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  P</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>P.B.: </Text> 
        Puntos Básicos{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>P.P.: </Text> 
        Puntos Porcentuales{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Precio Representativo: </Text>
        Es el precio que publican diariamente los mercados organizados institucionalizados autorizados, cuando finaliza la rueda
        de negociación diaria, que pretende reflejar el comportamiento del valor negociable en los últimos minutos de las negociaciones 
        del día, y surge de fórmulas prefijadas por los mercados que toman en cuenta el volumen negociado y la cantidad de operaciones
        registradas, entre otras cuestiones.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Precio Ganancias (Price Earnings): </Text>
        El Precio Ganancias es el resultado de dividir el precio de la acción por las ganancias por acción de una empresa.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Precio Valor Libros (Price to Book): </Text>
        El precio valor libros surge de dividir el precio de una acción por su valor libros o valor contable.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Precio Ventas (Price Sales)	: </Text> 
        El price sales o precio por ventas surge de dividir el valor de la acción por las ventas por acción (ventas dividido cantidad 
        de acciones).{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Préstamo Personal: </Text> 
        En este contrato, el cliente (prestatario) recibe de una entidad financiera (prestamista) una cantidad de dinero
        (capital del préstamo) que puede contar (o no) con una garantía colateral. La promesa de pago es la base sobre la que 
        el prestamista otorga la asistencia. Dado que el prestamista está asumiendo un mayor riesgo, la tasa de interés puede 
        ser mayor, o se le puede pedir que presente un codeudor que acepte pagar el préstamo en caso de que el cliente incumpla.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Préstamo Prendario: </Text> 
        Es un contrato de financiamiento mediante el cual una entidad financiera (prestamista) facilita a un cliente 
        (prestatario) una determinada cantidad de dinero (capital del préstamo) equivalente a un porcentaje del valor de un 
        bien mueble que se entrega en garantía. Se constituye entonces un contrato prendario{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Producto Bruto Interno: </Text> 
        Representa la producción de bienes y servicios finales de un determinado país a lo largo de un lapso de tiempo, expresada en valores 
        monetarios. Se puede medir tanto a precios corrientes o precios constante.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  R</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Rentabilidad: </Text> 
        La rentabilidad tiene lugar cuando el ingreso obtenido de una actividad es mayor que los gastos e impuestos necesarios para llevar
        a cabo {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Resultado sobre Patrimonio Neto ó Return on Equity: </Text> 
        El retorno sobre el PN mide la rentabilidad (%) de la participación de los dueños de la empresa (o PN).{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Resultado sobre Activo ó Return on Assets (ROA): </Text>
        El retorno sobre los activos indica la rentabilidad (%) que obtiene el empresario por cada peso que posee la empresa en activos.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Retorno sobre la Inversión (ROI): </Text>
        El retorno sobre la inversión indica la rentabilidad (%) que genera la empresa por cada peso invertido.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Riesgo Cambiario: </Text>
        Posibilidad de pérdidas producidas por variaciones del tipo de cambio entre la moneda nacional y la divisa de que se trate.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Riesgo de Mercado: </Text> 
        Riesgo de que una entidad sufra pérdidas por variaciones en el precio de mercado de sus activos, por ejemplo, de bonos y acciones.{"\n"}

    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  S</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>S&P: </Text> 
        Standard and Poors (Índice de las principales acciones en EE.UU. por capitalización bursátil). SCR: Sociedad Calificadora
        de Riesgo.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Sociedades de Garantía Recíproca: </Text> 
        Una Sociedad de Garantía Recíproca (SGR) es una sociedad comercial que tiene por objeto facilitar el acceso al 
        crédito de las PyMEs (Pequeñas y Medianas Empresas), a través del otorgamiento de garantías para el cumplimiento 
        de sus obligaciones. Además, brinda asesoramiento técnico, económico y financiero a sus socios en forma directa o a
         través de terceros contratados para ello.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Spread: </Text>
        Diferencia entre la tasa activa y la tasa pasiva. Indica la rentabilidad bruta sobre los recursos intermediados.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  T</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Tasa de Interés	: </Text> 
        Es el porcentaje que hay que pagar por los préstamos solicitados al banco o el porcentaje que se cobrará por los 
        ahorros depositados.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Tasa Activa: </Text> 
        Tasa que cobra el banco sobre los préstamos otorgados. Está en función del tipo de préstamo, la garantía, la moneda, el plazo, etc.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Tasa efectiva anual (TEA): </Text> 
        La tasa efectiva es aquella que surge cuando el producto de la inversión (interés o dividendos) se reinvierte junto con el capital 
        inicialmente invertido. Tiene lugar cuando la inversión se reinvierte o capitaliza más de una vez por año.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Tasa Interna de Retorno (TIR): </Text>
        Es la tasa a la cual el valor actual de los flujos de fondos es nulo.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Tasa Nominal Anual (TNA): </Text>
        Es el porcentaje que se acuerda entre el tomador del préstamo y el prestamista en concepto de interés. Tasa pasiva: Tasa que paga el banco por los depósitos que capta.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Trading: </Text> 
        Operatoria que consiste en la compra y venta de instrumentos financieros por cuenta propia, generalmente a corto plazo
        y con la expectativa de obtener beneficios rápidos. Por su carácter especulativo, exige un seguimiento atento y permanente
        de los mercados, ya que se trata de aprovechar pequeñas diferencias en los precios.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Transferencia Electrónica:: </Text> 
        Una transferencia bancaria es un sistema mediante el cual se transfieren fondos entre distintas cuentas bancarias 
        sin necesidad de transportar físicamente el dinero. Las transferencias bancarias pueden realizarse a través de cajeros
        automáticos, "home banking", o las sucursales de la entidad bancaria. En cuanto al destino de las transferencias, 
        pueden realizarse entre cuentas de una misma persona física o jurídica en un mismo banco, o en diferentes bancos en 
        diferentes países, o entre cuentas de diferentes titulares.{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  U</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>US$ o USD: </Text> 
        Dólares Americanos.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>U.V.A: </Text> 
        Unidad de Valor Adquisitivo - La unidad contempla la actualización por el Coeficiente de Estabilización de Referencia (CER).{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>U.V.I: </Text> 
        Unidad de Vivienda -  La unidad contempla la actualización por el Índice de la Construcción.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>U.V.P: </Text>
        Unidades Vinculadas al PIB{"\n"}
    </Text>
  },
  {content:
    <Text>
        <Text style={{color:'#5a4c6e', fontSize: 18, fontWeight: 'bold'}}>📚  V</Text> {"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>VAN (Valor Actual Neto): </Text> 
        Conocido como valor actualizado neto (en inglés NPV), es un procedimiento que permite calcular el valor presente de un
        determinado número de flujos de caja futuros, originados por una inversión.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Valor Negociable: </Text> 
        Título valor emitido en forma caratular o escritural, representativo de un crédito o derechos creditorios, acciones,
        cuotapartes de fondos comunes de inversión, títulos de deuda, certificados de participación en fideicomisos financieros 
        o de otro vehículo de inversión colectiva{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>VCP: </Text> 
        Valores de corto plazo{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>Vencimiento Título de Deuda: </Text>
        Es el período de tiempo hasta que el capital de un título de deuda puede ser repagado: ‐ Corto plazo: Menos de un año, 
        ediano plazo: Entre uno y cinco años y Largo plazo: Cinco años o más.{"\n"}
        <Text style={{color:'red', fontSize: 14, fontWeight: 'bold'}}>VN: </Text>
        Valor Nominal.{"\n"}
    </Text>
  },
  

];

export default function Glosario() {
  const [currentPage, setCurrentPage] = useState(0);

  const navigation = useNavigation();

  const onPageChange = (event) => {
    const offset = event.nativeEvent.contentOffset.x;
    const page = Math.round(offset / windowWidth);
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      scrollViewRef.current.scrollTo({ x: (currentPage - 1) * windowWidth, animated: true });
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      scrollViewRef.current.scrollTo({ x: (currentPage + 1) * windowWidth, animated: true });
      setCurrentPage(currentPage + 1);
    }
  };

  const scrollViewRef = React.createRef();
  
  return (
    <View style={styles.container}>
     <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
        onScroll={onPageChange}
        scrollEventThrottle={200}
    >
        {pages.map((page, index) => (
          <Card style={styles.card} key={index}>
            <Card.Content style={styles.cardContent}>
            {page.imageUrl && (
        <Image source={page.imageUrl} style={styles.image} />)}
              {page.title && <Text style={styles.title}>{page.title}</Text>}
              <ScrollView>
              {page.content && <Text style={styles.text}>{page.content}</Text>}
              </ScrollView>
            </Card.Content>
          </Card>
        ))}
     </ScrollView>
      <View style={styles.pageIndicator}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicatorDot,
              { backgroundColor: index === currentPage ? "#007bff" : "#ced4da" },
            ]}
          />
        ))}
      </View>
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={goToPreviousPage}>
            <AntDesign name="fastbackward" size={24} color={currentPage > 0 ? "#007bff" : "#ced4da"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={goToNextPage}>
            <AntDesign name="fastforward" size={24} color={currentPage < pages.length - 1 ? "#007bff" : "#ced4da"} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('OtraPantalla')}>
            <Text style={styles.text}>Ir a otra pantalla</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cfcfcf",
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    width: windowWidth -40,
    height: 'auto',
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 60, // Ajusta el margen superior del título
  },
  image: {
    width: 300, // Ancho de la imagen
    height: 200, // Alto de la imagen
    borderRadius: 25, // Borde redondeado para hacer un círculo
    marginRight: 10, // Espaciado a la derecha del título
    marginTop: 30,
  },
  text: {
    fontSize: 14,
    textAlign: "justify",
    marginTop: 10, // Ajusta el margen superior del texto
  },
  pageIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  pageIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
