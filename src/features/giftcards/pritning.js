import { message } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';

const generatePDFPage = async (cards, cardElements) => {
    const element = document.createElement('div');
    element.style.width = '8.5in';
    element.style.height = '11in';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.top = '-9999px';
    element.style.gridTemplateColumns = 'repeat(2, 0.1fr)';
    element.style.gridTemplateRows = 'repeat(4, 0.1fr)';
    element.className = 'grid p-[0.3in]';

    cardElements.forEach((html) => {
        const childElement = document.createElement('div');
        childElement.innerHTML = html;
        element.appendChild(childElement);
    });

    document.body.appendChild(element);

    const canvas = await html2canvas(element, { scale: 5, useCORS: true });
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
    });
    const imgWidth = 595.28;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

    document.body.removeChild(element);
    return pdf.output('blob');
};

const getCardHTML = (cardData, isFront) => {
    if (isFront) {
        return `
       <div style="width: 3.375in; height: 2.125in; background-color: #F4A261; padding: 0.05in; color: #F4A261; gap: 0.1in;">
    <div style="background-color: #264653; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; position: relative;">
        <div style="position: absolute; right: 0.1in; top: 0.12in; width: 100%; font-weight: 600; display: flex; justify-content: flex-end; align-items: flex-start; font-size: 0.19in; ">
            <div>1000 | Tickets</div>
        </div>
        <div style="font-size: 0.65in; font-family: 'Bangers';">
            Eventure
        </div>
    </div>
</div>

        `;
    } else {
        return `
        <div style="width: 3.375in; height: 2.125in; background-color: #F4A261; padding: 0.05in; color: #F4A261; font-family: 'Bubblegum Sans';">
    <div style="background-color: #264653; width: 100%; height: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding-left: 0.3in; padding-right: 0.3in; padding-top: 0.1in; space-y: 0.1in;">
            <div style="display: flex; flex-direction: column; gap: 0;">
                <div style="font-size: 0.23in; font-family: 'Bangers';">
                    Eventure
                </div>
                <div>Gift Card</div>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0;">
                <div>www.eventure.com</div>
                <div>support@eventure.com</div>
            </div>
        </div>
        <div style="font-size: 0.14in;">
            <ul>
                <li>Scratch below to reveal your unique ticket code.</li>
                <li>This gift card is redeemable for ONE time only on Eventure!</li>
                <li>Don't share your code with others.</li>
                <li>Find your next adventure!</li>
            </ul>
        </div>
        <div style="background-color: #E9C46A; font-size: 0.175in; width: 3.375in; height: 0.3in; display: flex; justify-content: center; align-items: center; color: #264653;">
            AL23B-HJK4D-F879Z-XCV12
        </div>
    </div>
</div>


        `;
    }
};

export const downloadCardsAsPDF = async ({ onProgressChange, selectedRowKeys, cards }) => {
    if (selectedRowKeys.length === 0) {
        message.warning('Please select at least one gift card to download PDFs.');
        return;
    }

    onProgressChange(0);

    const zip = new JSZip();
    const numPages = Math.ceil(selectedRowKeys.length / 8);

    for (let page = 0; page < numPages; page++) {
        const startIndex = page * 8;
        const endIndex = Math.min((page + 1) * 8, selectedRowKeys.length);
        const selectedCards = selectedRowKeys.slice(startIndex, endIndex);
        const cardData = selectedCards.map((key) => cards.find((data) => data.key === key));

        const backPromises = cardData.map((card) => getCardHTML(card, false));
        const frontPromises = cardData.map((card) => getCardHTML(card, true));

        const backBlob = await generatePDFPage(cards, backPromises);
        const frontBlob = await generatePDFPage(cards, frontPromises);

        const zipPage = new JSZip();
        zipPage.file(`patch_${page + 1}_back.pdf`, backBlob);
        zipPage.file(`patch_${page + 1}_front.pdf`, frontBlob);

        zip.file(`patch_${page + 1}.zip`, await zipPage.generateAsync({ type: 'blob' }));
        const newProgress = ((page + 1) / numPages) * 100;
        onProgressChange(newProgress);
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
        onProgressChange(0);

        const zipBlob = new Blob([content]);
        const zipUrl = URL.createObjectURL(zipBlob);
        const link = document.createElement('a');
        link.href = zipUrl;
        link.download = 'gift_cards.zip';
        link.click();
    });
};
