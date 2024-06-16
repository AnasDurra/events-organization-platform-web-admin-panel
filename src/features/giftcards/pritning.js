import { message } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import JSZip from 'jszip';

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

        const backPromises = new Promise((resolve) => {
            const element = document.createElement('div');
            element.style.width = '8.5in';
            element.style.height = '11in';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
            element.style.top = '-9999px';
            element.style.gridTemplateColumns = 'repeat(2, 0.1fr)';
            element.style.gridTemplateRows = 'repeat(4, 0.1fr)';
            element.className = 'grid p-4';

            selectedCards.forEach((card) => {
                const childElement = document.createElement('div');
                const cardData = cards.find((data) => data.key === card);

                childElement.innerHTML = `
                        <div class='w-[3.375in] h-[2.125in] bg-[#9f471c]  p-1 text-white'>
                            <div class='bg-[#FF7F3E] w-full h-full  '>
                                <div class='flex items-center justify-between px-6 pt-1'>
                                    <div class='flex flex-col justify-center items-center'>
                                        <div class='text-lg' style='font-family: Bangers;'>Eventure</div>
                                        <div>Gift Card</div>
                                    </div>
                                    <div class='flex flex-col justify-start items-center text-[0.8em]'>
                                        <div>www.eventure.com</div>
                                        <div>support@eventure.com</div>
                                    </div>
                                </div>
                                <div class='text-[0.85em]'>
                                    <ul>
                                        <li>Scratch below to reveal your unique ticket code.</li>
                                        <li>This gift card is redeemable for ONE time only on Eventure!</li>
                                        <li>Don't share your code with others.</li>
                                        <li>Find your next adventure!</li>
                                    </ul>
                                </div>
                                <div class='bg-[#FFF6E9] w-[3.375in] h-[0.3in] flex justify-center items-center text-[#FF7F3E]'>
                                    ${cardData?.code}
                                </div>
                            </div>
                        </div>
                    `;
                element.appendChild(childElement);
            });

            document.body.appendChild(element);

            html2canvas(element, { scale: 10, useCORS: true }).then((canvas) => {
                // Increased scale to 5 for better quality
                const imgData = canvas.toDataURL('image/png', 1.0); // Set image quality to 1.0 (highest)
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4',
                });
                const imgWidth = 595.28; // Width of A4 in points (8.27 inches * 72 points/inch)
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST'); // Use 'FAST' compression
                resolve(pdf.output('blob'));
            });

            document.body.removeChild(element);
        });

        const frontPromises = new Promise((resolve) => {
            const element = document.createElement('div');
            element.style.width = '8.5in';
            element.style.height = '11in';
            element.style.position = 'absolute';
            element.style.left = '-9999px';
            element.style.top = '-9999px';
            element.style.gridTemplateColumns = 'repeat(2, 0.1fr)';
            element.style.gridTemplateRows = 'repeat(4, 0.1fr)';
            element.className = 'grid p-4';

            selectedCards.forEach((card) => {
                const childElement = document.createElement('div');
                const cardData = cards.find((data) => data.key === card);

                childElement.innerHTML = `
                          <div
                class='w-[3.375in] h-[2.125in] bg-[#9f471c] p-1 text-white'
            >
                <div class='bg-[#FF7F3E] w-full h-full flex justify-center items-center  relative'>
                    <div
                        class='absolute right-4 top-4 w-full font-semibold flex justify-end items-start space-x-[0.1em] text-[1.1em]'
                       style='font-family: Press Start 2P;'
                    >
                        <div>${cardData.tickets} | Tickets</div>
                    </div>
                    <div
                        class='text-[4em]'
                        style='font-family: Bangers;'
                    >
                        Eventure
                    </div>
                </div>
            </div>
                    `;
                element.appendChild(childElement);
            });

            document.body.appendChild(element);

            html2canvas(element, { scale: 10, useCORS: true }).then((canvas) => {
                // Increased scale to 5 for better quality
                const imgData = canvas.toDataURL('image/png', 1.0); // Set image quality to 1.0 (highest)
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'pt',
                    format: 'a4',
                });
                const imgWidth = 595.28; // Width of A4 in points (8.27 inches * 72 points/inch)
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST'); // Use 'FAST' compression
                resolve(pdf.output('blob'));
            });

            document.body.removeChild(element);
        });

        const backBlobs = await Promise.all([backPromises]);
        const frontBlobs = await Promise.all([frontPromises]);

        const zipPage = new JSZip();

        backBlobs.forEach((blob, index) => {
            zipPage.file(`card_${index + 1}_back.pdf`, blob);
        });

        frontBlobs.forEach((blob, index) => {
            zipPage.file(`card_${index + 1}_front.pdf`, blob);
        });

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
