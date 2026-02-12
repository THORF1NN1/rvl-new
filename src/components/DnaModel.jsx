import './DnaModel.css';

function DnaModel() {
    return (
        <div className="dna-container">
            <div className="dna-rotator">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="dna-pair" style={{ '--i': i }}>
                        <div className="dna-node node-left"></div>
                        <div className="dna-link"></div>
                        <div className="dna-node node-right"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DnaModel;
