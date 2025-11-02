import PromoCardList from "./PromoCard"

function SectionComponent(){

    return(
        <section id="hero">
            <div id="hero-container">
              <div className="container-promo-cards">
                    <h2>Ofertas Imperdíveis</h2>
                    <PromoCardList/>
                </div>  
            </div>
        </section>
    )
}

export default SectionComponent 