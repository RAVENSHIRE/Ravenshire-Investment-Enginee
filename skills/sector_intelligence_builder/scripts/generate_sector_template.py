import json
import argparse

SECTOR_TEMPLATES = {
    "tech": {
        "title": "TECH INTEL",
        "subtitle": "Technology Sector Intelligence",
        "catalyst": "AI Compute Scarcity & Energy Bottleneck",
        "icon": "Zap",
        "color": "from-cyan-400 to-blue-500",
        "accentColor": "text-cyan-400",
        "borderColor": "border-cyan-500/30",
        "stocks": [
            {"ticker": "NVDA", "name": "NVIDIA", "price": 142.50, "change": 3.25, "changePercent": 2.34, "metric": "GPU Dominance", "metricValue": "92% Market Share"},
            {"ticker": "AVGO", "name": "Broadcom", "price": 175.20, "change": 1.45, "changePercent": 0.83, "metric": "AI ASIC", "metricValue": "Custom Silicon Leader"},
            {"ticker": "ASML", "name": "ASML", "price": 950.00, "change": -5.20, "changePercent": -0.54, "metric": "EUV Monopoloy", "metricValue": "100% Market Share"},
            {"ticker": "TSM", "name": "TSMC", "price": 185.10, "change": 2.10, "changePercent": 1.15, "metric": "Foundry Share", "metricValue": "61% Global Share"},
            {"ticker": "MSFT", "name": "Microsoft", "price": 420.50, "change": 0.75, "changePercent": 0.18, "metric": "Cloud AI", "metricValue": "Azure Growth 31%"},
            {"ticker": "GOOGL", "name": "Alphabet", "price": 175.80, "change": 1.20, "changePercent": 0.69, "metric": "TPU v6", "metricValue": "Internal Compute"},
            {"ticker": "META", "name": "Meta", "price": 510.30, "change": 4.50, "changePercent": 0.89, "metric": "Llama 4", "metricValue": "Open Source Standard"},
            {"ticker": "AMD", "name": "AMD", "price": 165.40, "change": -1.10, "changePercent": -0.66, "metric": "MI325X", "metricValue": "Memory Leader"}
        ],
        "narratives": [
            {"num": "01", "title": "AI Compute Scarcity", "body": "GPU supply remains constrained through 2026 as demand for H100/B200 clusters outpaces TSMC capacity."},
            {"num": "02", "title": "Energy Bottleneck", "body": "Data center power consumption is the new scaling limit. Nuclear and SMR solutions are becoming critical infrastructure."},
            {"num": "03", "title": "Sovereign AI", "body": "Nations are building internal compute clusters to ensure data privacy and strategic autonomy."},
            {"num": "04", "title": "Edge Inference", "body": "The shift from training to inference is driving demand for NPU-enabled consumer hardware."},
            {"num": "05", "title": "Custom Silicon", "body": "Hyperscalers are moving to internal ASICs to reduce dependency on NVIDIA margins."}
        ],
        "catalysts": [
            {"date": "Q2 2026", "event": "GPU Supply Relief", "desc": "TSMC 3nm ramp accelerates, easing Blackwell lead times."},
            {"date": "Aug 2026", "event": "Llama 4 Release", "desc": "Meta expected to drop next-gen model, resetting open-source benchmarks."},
            {"date": "Nov 2026", "event": "Nuclear PPA Wave", "desc": "Major hyperscalers expected to sign direct power purchase agreements with nuclear providers."}
        ]
    },
    "health": {
        "title": "HEALTH INTEL",
        "subtitle": "Healthcare & Biotech Intelligence",
        "catalyst": "GLP-1 Revolution & Longevity Boom",
        "icon": "Heart",
        "color": "from-emerald-400 to-green-500",
        "accentColor": "text-emerald-400",
        "borderColor": "border-emerald-500/30",
        "stocks": [
            {"ticker": "LLY", "name": "Eli Lilly", "price": 945.20, "change": 12.50, "changePercent": 1.34, "metric": "GLP-1 Share", "metricValue": "Zepbound Growth"},
            {"ticker": "NVO", "name": "Novo Nordisk", "price": 145.80, "change": 2.10, "changePercent": 1.46, "metric": "Wegovy Sales", "metricValue": "$12B Annualized"},
            {"ticker": "AMGN", "name": "Amgen", "price": 310.50, "change": -1.20, "changePercent": -0.38, "metric": "MariTide", "metricValue": "Phase 2 Data"},
            {"ticker": "VRTX", "name": "Vertex", "price": 480.30, "change": 5.40, "changePercent": 1.14, "metric": "Pain Pipeline", "metricValue": "Non-Opioid Lead"},
            {"ticker": "REGN", "name": "Regeneron", "price": 980.00, "change": 8.50, "changePercent": 0.87, "metric": "Eylea HD", "metricValue": "Market Recovery"},
            {"ticker": "ISRG", "name": "Intuitive Surgical", "price": 450.20, "change": 3.10, "changePercent": 0.69, "metric": "Da Vinci 5", "metricValue": "Install Base +14%"},
            {"ticker": "MRK", "name": "Merck", "price": 125.40, "change": 0.45, "changePercent": 0.36, "metric": "Keytruda", "metricValue": "Oncology King"},
            {"ticker": "PFE", "name": "Pfizer", "price": 28.50, "change": -0.15, "changePercent": -0.52, "metric": "Yield", "metricValue": "6.2% Dividend"}
        ],
        "narratives": [
            {"num": "01", "title": "Metabolic Gold Rush", "body": "GLP-1 drugs are expanding into sleep apnea, kidney disease, and cardiovascular health."},
            {"num": "02", "title": "Longevity Science", "body": "Investment in biological age reversal and epigenetic reprogramming is hitting institutional scale."},
            {"num": "03", "title": "AI Drug Discovery", "body": "Generative AI is cutting drug development timelines from 10 years to 3 years."},
            {"num": "04", "title": "Personalized Oncology", "body": "mRNA vaccines and CAR-T therapies are moving to first-line treatments."},
            {"num": "05", "title": "MedTech Convergence", "body": "Robotics and real-time imaging are making surgery 100% data-driven."}
        ],
        "catalysts": [
            {"date": "Q3 2026", "event": "Oral GLP-1 Data", "desc": "Lilly expected to release pivotal data for oral weight loss pill."},
            {"date": "Oct 2026", "event": "Longevity Summit", "desc": "Major clinical results for senolytic therapies expected in Zurich."},
            {"date": "Dec 2026", "event": "FDA AI Framework", "desc": "New guidelines for AI-discovered molecules expected to be finalized."}
        ]
    }
    # Add other sectors as needed
}

def main():
    parser = argparse.ArgumentParser(description='Generate structured sector data JSON.')
    parser.add_argument('--sector', type=str, required=True, help='Sector name (tech, health, consumer, utilities, crypto)')
    parser.add_argument('--output', type=str, required=True, help='Output JSON file path')

    args = parser.parse_args()

    sector = args.sector.lower()
    if sector not in SECTOR_TEMPLATES:
        print(f"Error: Sector '{sector}' not found. Available: {', '.join(SECTOR_TEMPLATES.keys())}")
        return

    data = SECTOR_TEMPLATES[sector]

    with open(args.output, 'w') as f:
        json.dump(data, f, indent=2)

    print(f"Successfully generated {args.output} for sector '{sector}'.")

if __name__ == "__main__":
    main()
