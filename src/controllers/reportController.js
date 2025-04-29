const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit");

const marcasModel = require("../models/marcasModel");

const exportMarcasCSV = async (req, res) => {
    try {
        const marcas = await marcasModel.getMarcas();

        res.setHeader("Content-Disposition", "attachment; filename=marcas.csv");
        res.setHeader("Content-Type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        marcas.forEach((marca) => {
            csvStream.write({
                Id: marca.id,
                Name: marca.name,
                Fundador: marca.fundador || "Sem Fundador",
            });
        });

        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar CSV." });
    }
};

const exportMarcasPDF = async (req, res) => {
    try {
        console.log("Iniciando geração do PDF...");
        const marcas = await marcasModel.getMarcas();
        console.log("Dados das marcas retornados:", marcas); 
        if (!marcas || marcas.length === 0) {
            console.error("Nenhuma marca encontrada."); 
            return res.status(404).json({ message: "Nenhuma marca encontrada." });
        }

        res.setHeader("Content-Disposition", "inline; filename=marcas.pdf");
        res.setHeader("Content-Type", "application/pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Relatório de Marcas", { align: "center" });
        doc.moveDown();

        // Cabeçalho
        doc.fontSize(12).text("Id | Nome | Fundador", { underline: true });
        doc.moveDown();

        // Adicionar dados das marcas
        marcas.forEach((marca) => {
            doc.text(
                `${marca.id} | ${marca.name} | ${marca.fundador || "Sem Fundador"}`
            );
        });

        doc.end();
    } catch (error) {
        console.error("Erro ao gerar PDF:", error); 
        res.status(500).json({ message: "Erro ao gerar PDF." });
    }
};

module.exports = { exportMarcasCSV, exportMarcasPDF };