import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import {apiUrl} from './config.js'
import axios from 'axios';
import Vue1 from 'vue'

export default {
  install(Vue, options) {
    Vue.prototype.getPdf = function () {
      var title = this.htmlTitle
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(function (canvas) {
          console.log(canvas)
          let contentWidth = canvas.width  //整体页面的宽度
          let contentHeight = canvas.height//整体页面的高度
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 600 * 400;
          //未生成pdf的html页面高度
          let leftHeight = contentHeight
          //
          let position = 0
          let imgWidth = 600
          let imgHeight = 600 / contentWidth * contentHeight;
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('landscape', 'pt', [400, 600])
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 400
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
          // generatePdf(PDF.output("datauristring"));
        }
      )
    }
  }

}

function generatePdf(data) {
  console.log('==============')
  axios({
    url: apiUrl + '/print/uploadFile',
    method: 'POST',
    headers: {
      "token": Vue1.cookie.get('token'),
    },
    data: {
      data: data
    }
  }).then((res) => {
    console.log(res)
  })


}
