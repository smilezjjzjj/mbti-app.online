'use client';

import { DEEPSEEK_CONFIG } from './constants';
import { DeepseekResponse } from './types';

function cleanMarkdownSyntax(text: string): string {
  return text
    .replace(/[*#_`]/g, '') // 移除 Markdown 标记
    .replace(/\n{3,}/g, '\n\n') // 将多个换行替换为双换行
    .replace(/[ \t]+/g, ' ') // 将多个空格和制表符替换为单个空格
    .trim(); // 移除首尾空格
}

// 专业级模拟数据，达到专业MBTI报告水平
function getMockInterpretation(mbtiType: string): string[] {
  const mockData: { [key: string]: string[] } = {
    'INTJ': [
      '职业发展深度解析：作为"建筑师"型人格，你拥有极其罕见的战略思维与执行力完美结合的特质，这使你在职场中具备独特的竞争优势。你的大脑天生具备系统性思考能力，能够在复杂的信息中识别出隐藏的模式和潜在机会，这种洞察力让你能够看到别人无法察觉的可能性。在职业选择上，你最适合那些需要长期战略规划、创新思维和独立决策权的高级职位，如企业战略总监、产品架构师、科研项目负责人、投资分析师、管理咨询顾问等。你的核心优势在于能够将抽象的概念和愿景转化为具体可行的实施方案，同时保持对细节的关注和对质量的严格要求。然而，需要注意的是，你对完美的过度追求可能会影响项目的推进效率，建议学会在"完美"与"及时交付"之间找到平衡点。在职业发展中，你应该主动寻求那些能够充分发挥你创新能力和战略思维的机会，同时有意识地培养团队协作和沟通技能。学会将你的宏伟愿景以通俗易懂的方式传达给团队成员，这将大大提升你的领导效力。建议定期参加跨部门项目，锻炼你的人际协调能力。记住，最伟大的想法只有被成功实现并产生实际价值时才真正有意义。在职业规划上，建议你设定5-10年的长期目标，并制定详细的阶段性里程碑，这样既能满足你对规划的需求，又能确保持续的成长动力。',
      '人际关系深度剖析：你在人际关系中展现出高度的选择性和深度性特征，这既是你的优势也是需要平衡的挑战。你天生不喜欢表面化的社交活动，更倾向于与那些智力水平相当、价值观相近的人建立深层次的精神连接。你的社交圈可能相对较小，但每一段关系都经过深思熟虑的筛选和长期的信任建立过程。在亲密关系中，你是极其忠诚可靠的伙伴，习惯用实际行动而非华丽言辞来表达关爱和承诺。你对伴侣的要求较高，希望对方能够理解并支持你的理想和目标，同时也能在智力层面与你产生共鸣。然而，你可能在情感表达和理解他人情绪需求方面存在一定挑战。你的理性思维模式有时会让你忽略情感因素的重要性，这可能导致亲近的人感到被忽视或不被理解。建议你主动学习和练习情商技能，尝试用对方能够理解和接受的方式表达关心和爱意。有时候，一个简单的问候、一个温暖的拥抱，或者主动询问对方的感受，比提供复杂的解决方案更能触动人心。在职场人际关系中，要学会欣赏和尊重不同工作风格的同事，避免因为方法论差异而产生不必要的冲突。建议定期进行换位思考练习，尝试从他人的角度理解问题，这将帮助你建立更和谐的人际关系网络。',
      '个人成长全面指南：你的个人成长之路是一个持续自我完善和逐步实现宏伟愿景的深度旅程。作为INTJ类型，你天生具备强烈的学习欲望和自我驱动力，这是你最宝贵的成长资产。然而，真正的成长需要你在理性与感性、独立与合作、完美主义与实用主义之间找到动态平衡。建议你制定清晰的长期成长目标，并将其分解为具体的、可衡量的阶段性计划。在追求卓越的同时，要学会接受"足够好"的标准，避免陷入完美主义的陷阱而错失重要机会。你的成长重点应该包括：首先，培养耐心和同理心，这将显著提升你与他人协作的效果；其次，发展公众演讲和团队领导技能，学会激励和影响他人；第三，拓展你的知识边界，不仅要在专业领域深耕，也要涉猎其他学科以获得跨领域的洞察力。建议建立定期的自我反思机制，每月评估目标的合理性和进展情况，必要时进行调整。寻找能够挑战你思维的导师或加入高质量的专业社群，与其他有远见的人交流想法和经验。这不仅能为你提供新的视角和灵感，还能帮助你建立有价值的人脉网络。记住，真正的成长不仅仅是知识技能的积累，更是智慧、人格和影响力的全面提升。考虑将你的专业知识和经验用于指导他人，成为别人的导师，这种"教学相长"的过程将加速你自己的成长。最后，要保持对未来趋势的敏感度，持续学习新技术和新理念，确保你的能力始终与时代发展同步。'
    ],
    'ENFP': [
      '职业发展深度解析：作为"竞选者"型人格，你是职场中天生的激励者、创新者和变革推动者。你拥有极其罕见的热情感染力和创造性思维，这使你能够在任何工作环境中都成为积极能量的源泉和创新想法的发源地。你的职业优势主要体现在：卓越的人际沟通能力、敏锐的市场洞察力、强大的适应性和学习能力，以及将抽象概念转化为引人入胜故事的天赋。你最适合那些允许创意表达、频繁人际互动和工作内容多样化的职业领域，如市场营销总监、公关传播专家、培训教育顾问、创意设计师、心理咨询师、产品经理、媒体策划等。在这些领域中，你能够充分发挥你的创新思维和人际影响力，创造出既有商业价值又有社会意义的成果。你的工作风格倾向于灵活多变，喜欢在压力下迸发创意，善于在团队中扮演"催化剂"的角色，激发他人的潜能和热情。然而，你也面临一些职业挑战：可能在细节执行和长期专注方面遇到困难，容易被新的想法分散注意力，有时会承诺过多而难以全部兑现。建议你在职业发展中采取以下策略：寻找能够发挥你人际影响力和创新能力的核心职位，同时主动培养项目管理和时间管理技能；学会将宏大的创意分解为具体的执行步骤，并设定明确的里程碑；考虑与细节导向、执行力强的同事或助手合作，形成优势互补的工作模式；定期进行自我评估，确保你的多个项目都能得到适当的关注和推进。记住，你的真正价值不仅在于产生创新想法，更在于激励和引导团队将这些想法转化为现实成果。',
      '人际关系深度剖析：你是人际关系领域的天然建设者和维护者，拥有极其罕见的共情能力和情感感染力。你能够迅速与各种性格类型的人建立深度连接，让他们感到被真正理解、重视和激励。你的社交网络通常非常广泛且多元化，涵盖各个年龄段、职业背景和文化背景的朋友，每个人都能从与你的交往中获得独特的启发、支持和正能量。在友谊关系中，你是那种能够记住朋友重要日子、主动提供帮助、在困难时刻给予温暖支持的人。你善于发现他人的优点和潜力，并能够用恰当的方式表达欣赏和鼓励。在亲密关系中，你是充满激情、创意和浪漫的伙伴，总是能够为关系注入新鲜感和惊喜元素。你重视情感交流和精神共鸣，希望与伴侣分享内心世界和人生理想。然而，你在人际关系中也面临一些挑战：可能在保持长期承诺和处理深层冲突方面遇到困难，有时会为了维持表面和谐而回避必要的冲突解决；容易过度投入他人的问题而忽略自己的需求，导致情感透支；在面对批评或拒绝时可能过于敏感。建议你在人际关系中采取以下策略：学会设定健康的情感边界，避免过度承诺或情感透支；在处理人际冲突时，要学会直面问题而非回避，运用你的沟通技巧寻找双赢的解决方案；培养深度倾听的技能，不仅要表达自己的想法，也要给他人充分的表达空间；定期进行自我关怀，确保在照顾他人的同时也满足自己的情感需求。记住，真正健康的友谊和爱情关系需要深度、真诚和持续的相互投入，而不仅仅是表面的和谐与快乐。',
      '个人成长全面指南：你的个人成长之路充满无限可能性和精彩变化，但同时也需要明确的方向指引和专注力培养。作为ENFP类型，你天生具备卓越的适应性、学习能力和从各种经历中汲取智慧的天赋，这些都是你成长路上的宝贵资产。然而，要实现真正的个人突破和长期成功，你需要在保持天性活力的同时，有意识地培养一些关键能力。你的成长重点应该包括以下几个方面：首先，专注力和执行力的培养是你最需要突破的领域。建议你学会在众多诱人的机会中做出明智选择，制定灵活但明确的目标体系，允许自己在追求过程中适度调整方向，但要确保始终朝着有意义的核心目标前进。其次，深度思考习惯的养成对你的长期发展至关重要。不要满足于对事物的表面理解，要努力挖掘现象背后的本质规律和内在联系，这将大大提升你的洞察力和判断力。第三，情绪管理和能量管理技能的掌握将帮助你避免因过度投入而导致的倦怠。学会识别自己的情绪周期，在高能量时期承担重要任务，在低能量时期进行休息和反思。第四，寻找能够持续挑战你、激发你潜能的环境和伙伴关系，这些外部刺激将为你的成长提供持续动力。建议你建立多元化的学习渠道，包括正式教育、在线课程、读书会、专业会议等，保持知识结构的更新和扩展。同时，要重视实践经验的积累，将理论知识转化为实际技能。记住，你的成长不仅是个人能力的提升，更是对周围世界产生积极影响的能力的增强。考虑将你的热情、创意和人际技能用于服务他人和推动社会进步，这种利他主义的成长方式将为你的人生带来更深层次的满足感和成就感。'
    ],
    'ISTJ': [
      '职业发展深度解析：作为"物流师"型人格，你是现代组织架构和社会运行体系中不可或缺的坚实基石。你拥有极其珍贵的品质组合：无与伦比的责任感、高度的可靠性、卓越的执行力和系统化的思维能力，这些特质在任何职业环境中都具有巨大价值。你的工作风格以稳定、精确、有序为特征，能够在复杂的工作环境中建立和维护高效的运营体系。你最适合那些需要精确性、稳定性、系统化管理和长期规划的职业领域，如财务管理、审计、项目管理、法律事务、医疗保健、政府服务、质量控制、运营管理等。在这些领域中，你的优势得到最大化发挥：你能够建立完善的工作流程和标准操作程序，确保任务按时按质完成；你具备敏锐的风险识别能力，能够预见潜在问题并制定有效的预防措施；你的细致入微和一丝不苟确保了工作成果的高质量和可靠性。你在团队中通常扮演"定海神针"的角色，为其他成员提供稳定的支持和可靠的保障。然而，在快速变化的商业环境中，你也面临一些挑战：可能在适应突发变化和处理模糊不确定情况时感到压力；有时会因为过分追求完美而影响效率；在创新思维和灵活应变方面可能需要额外努力。建议你在职业发展中采取以下策略：主动学习新技术、新方法和新理念，保持与行业发展的同步；在坚持核心原则的基础上培养一定的灵活性和适应性；寻找能够发挥你稳定性优势同时提供适度挑战的职位；建立持续学习的习惯，定期更新专业知识和技能；考虑在稳定的基础上逐步承担更多的领导责任，将你的可靠性和系统思维能力用于指导和培养他人。',
      '人际关系深度剖析：你在人际关系中展现出深度的忠诚、可靠和长期承诺的珍贵品质，这些特质使你成为他人生命中极其重要和值得信赖的存在。虽然你可能不是那种善于用华丽言辞表达情感的人，但你用持续的实际行动证明着你的关爱、支持和承诺。你的朋友和家人深知，无论何时何地，只要他们需要帮助，你都会毫不犹豫地伸出援手，提供实实在在的支持和解决方案。在友谊关系中，你重视质量胜过数量，倾向于建立少数几段深度而持久的友谊，而不是广泛但浅层的社交网络。你的朋友圈通常由那些与你价值观相近、性格互补的人组成，你们之间的友谊经得起时间的考验。在亲密关系中，你是极其稳定可靠的伙伴，重视传统价值观和长期承诺，愿意为关系的稳定和发展投入大量的时间和精力。你的爱情观念偏向传统和实用，更看重伴侣的品格、责任感和共同目标，而不是一时的激情或浪漫。然而，你在人际关系中也面临一些挑战：可能在情感表达和理解他人复杂情绪需求方面存在困难；有时会因为过分关注实际问题而忽略情感层面的交流；在面对他人的非理性行为或情绪化反应时可能感到困惑或不耐烦。建议你在人际关系中采取以下改进策略：主动学习和练习情感表达技巧，尝试用言语表达你的关爱、欣赏和感激；努力理解不同的人有不同的沟通风格和情感需求，学会适应和调整你的交流方式；在职场人际关系中，要学会欣赏和尊重创新型同事的贡献，即使他们的工作方式与你截然不同；定期主动关心身边重要的人，询问他们的感受和需求，而不仅仅是提供解决方案。记住，情感连接和实际支持同样重要，多样性的人际关系能够为你的生活带来更丰富的体验和更广阔的视野。',
      '个人成长全面指南：你的个人成长之路是一个稳步前进、持续积累、逐步完善的深度过程。作为ISTJ类型，你天生具备自律、毅力和长期坚持的优秀品质，这些都是实现重大人生目标的重要基础。然而，在快速变化的现代社会中，真正的成长需要你在保持核心优势的同时，有意识地拓展能力边界和思维模式。你的成长策略应该围绕以下几个核心方面展开：首先，在保持稳定性优势的同时，要主动拥抱适度的变化和挑战。这并不意味着放弃你的核心价值观，而是要培养在变化中保持平衡的能力。建议制定明确而灵活的成长计划，包括短期技能提升、中期知识更新和长期视野拓展三个层次。其次，要特别注重工作与生活的平衡，避免因过度专注工作而导致身心疲惫或人际关系疏远。建立规律的休息和娱乐时间，培养工作之外的兴趣爱好，这不仅能够缓解压力，还能为你提供新的视角和灵感。第三，培养开放包容的心态对你的长期发展至关重要。尝试接受和理解与你传统观念不符的新想法和新方法，这种思维的灵活性将帮助你在复杂多变的环境中保持竞争力。第四，要重视持续学习和知识更新，特别是在你的专业领域保持前沿水平。同时，也要适当涉猎其他学科，培养跨领域的思维能力。建议定期参加专业培训、学术会议或在线课程，与同行交流最新的理念和实践。第五，考虑逐步承担更多的领导和指导责任，将你的经验和智慧传授给年轻同事或新人。这种"传帮带"的过程不仅能够帮助他人成长，也会促进你自己的反思和提升。最后，要保持对未来趋势的关注和敏感度，虽然你偏好稳定，但了解变化趋势能够帮助你做出更明智的决策。记住，真正的成长是全方位的，包括专业能力、人际技能、情商发展和人生智慧的综合提升。'
    ]
  };

  return mockData[mbtiType] || [
    `职业发展深度解析：${mbtiType}类型的人具有独特而宝贵的职业优势和巨大的发展潜力。你的性格特质组合决定了你在特定领域能够发挥出色甚至卓越的表现，关键在于深入了解和充分发挥你的核心优势。建议进行全面的自我评估，识别你最突出的能力和最感兴趣的领域，然后选择能够最大化发挥这些优势的职业方向。同时，要诚实地面对自己的发展盲区和潜在弱点，通过有针对性的学习、实践和寻求他人帮助来逐步改善。在制定职业规划时，要综合考虑行业发展趋势、个人价值观匹配度、经济回报和成就感满足度等多个维度，寻找既能实现财务目标又能带来深层满足感的工作。记住，最理想的职业不仅仅是高薪或高地位的工作，而是那些能让你感到充实、有意义、能够持续成长并对社会产生积极影响的工作。建议定期评估和调整你的职业目标，确保它们始终与你的成长和变化保持同步。`,
    `人际关系深度剖析：作为${mbtiType}类型，你在人际交往中拥有独特的风格、优势和成长空间。深入了解你的沟通偏好、情感表达方式和社交需求，将有助于你建立更加和谐、深入和有意义的人际关系网络。要学会真正欣赏和理解不同性格类型的人，因为这种多样性不仅能够为你的生活带来丰富多彩的体验，还能提供宝贵的学习和成长机会。在处理人际冲突和分歧时，要充分运用你的性格优势，同时也要学会适当的妥协和调整，寻找双赢的解决方案。建立健康而明确的人际边界非常重要，既要保持开放友善的态度，也要保护自己的核心需求、价值观和个人空间。要重视情感投资和关系维护，真正优质的人际关系需要时间、精力和真诚的投入。学会在给予他人支持的同时，也要勇于寻求和接受他人的帮助，建立相互支持的健康关系模式。记住，最好的人际关系是建立在相互理解、尊重、信任和支持基础上的，这样的关系能够经受时间的考验并在困难时期提供强大的支撑。`,
    `个人成长全面指南：你的个人成长之路具有${mbtiType}类型的独特特征和无限潜力，需要制定个性化的发展策略和实施计划。要充分认识和发挥你的天然优势，这些优势是你成长的基石和动力源泉。同时，也要勇敢面对和积极改善你的相对弱点，将它们视为成长的机会而非障碍。制定符合你性格特点和生活节奏的学习和发展计划，选择最适合你的成长方式、学习方法和进步节奏。保持开放包容的心态，积极拥抱新的经历、挑战和学习机会，因为这些都是促进个人突破和能力提升的宝贵资源。建立定期的自我反思和评估机制，客观评价你的进步情况和需要调整的方向，确保成长过程始终朝着正确的方向前进。主动寻找和建立能够支持你成长的环境、平台和伙伴关系，因为个人成长往往是在与优秀的人和环境的互动中实现的。要重视全面发展，真正的成长不仅包括专业技能和知识的积累，还包括情商、社交能力、创新思维、领导力和人生智慧等多个维度的综合提升。记住，成长是一个终身的过程，要保持持续学习的热情和不断超越自我的勇气。`
  ];
}

async function fetchWithRetry(url: string, options: RequestInit, retries = 3, delay = 2000): Promise<Response> {
  try {
    console.log(`发起API请求 (剩余重试次数: ${retries})`);
    
    // 创建新的 AbortController
    const controller = new AbortController();
    let timeoutId: NodeJS.Timeout | null = null;
    
    // 设置超时
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        console.log('请求超时，中断请求...');
      controller.abort();
        reject(new Error('请求超时'));
      }, 120000); // 2分钟超时
    });
    
    // 发起请求
    const fetchPromise = fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    // 竞争：请求完成 vs 超时
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    
    // 清除超时
    if (timeoutId) {
    clearTimeout(timeoutId);
    }
    
    console.log('API请求完成，状态码:', response.status);
    
    // 对于特定错误码的处理
    if (response.status === 429) {
      throw new Error('API 请求超过频率限制，请稍后再试');
    }
    
    if (response.status === 401) {
      throw new Error('API 密钥无效或已过期，请检查您的 API 密钥设置');
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API 请求失败: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    
    return response;
  } catch (error) {
    console.error(`请求尝试失败 (剩余重试次数: ${retries}):`, error);
    
    // 改善错误处理
    if (error instanceof Error) {
      if (error.name === 'AbortError' || error.message.includes('请求超时')) {
        console.log('请求被中断或超时');
        if (retries <= 0) {
          throw new Error('请求超时，请检查网络连接或稍后重试');
        }
      }
      if (error.message.includes('Failed to fetch')) {
        console.log('网络连接失败');
        if (retries <= 0) {
          throw new Error('网络连接失败，请检查网络设置');
        }
      }
    }
    
    if (retries <= 0) throw error;
    
    console.log(`${delay}ms 后重试...`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return fetchWithRetry(url, options, retries - 1, delay * 1.5);
  }
}

export async function generateMbtiInterpretationWithDeepseek(mbtiType: string, quickMode: boolean = false): Promise<string[]> {
  try {
    // 调试：检查API密钥
    console.log('API密钥检查:', {
      hasKey: !!DEEPSEEK_CONFIG.apiKey,
      keyLength: DEEPSEEK_CONFIG.apiKey?.length,
      keyStart: DEEPSEEK_CONFIG.apiKey?.substring(0, 10),
      isDefault: DEEPSEEK_CONFIG.apiKey?.includes('请在.env.local文件中设置')
    });
    
    // 检查API密钥是否设置
    if (!DEEPSEEK_CONFIG.apiKey || DEEPSEEK_CONFIG.apiKey.includes('请在.env.local文件中设置')) {
      throw new Error('未设置 API 密钥，请在 .env.local 文件中设置 NEXT_PUBLIC_DEEPSEEK_API_KEY');
    }
    
    console.log(`使用真实API进行MBTI解读... ${quickMode ? '(快速模式)' : '(标准模式)'}`);
    
    // 根据模式调整prompt和参数
    const systemPrompt = quickMode 
      ? `你是一位世界顶级的MBTI性格分析专家，拥有心理学博士学位和20年临床经验。

请严格按照以下要求提供专业的MBTI性格类型解读：

1. 使用标准中文标点符号：
   - 句子结尾使用句号（。）
   - 列举时使用顿号（、）分隔
   - 并列关系使用逗号（，）
   - 引用或强调使用双引号（""）
   - 冒号（：）用于解释说明
   - 分号（；）用于复杂句子的分隔

2. 内容要求：
   - 每个方面300-400字
   - 语言流畅自然，逻辑清晰
   - 融合最新心理学研究成果和实用建议
   - 避免使用特殊符号、星号、井号等标记

3. 格式要求：
   - 直接用纯文本表达
   - 段落之间用换行分隔
   - 不使用Markdown格式`
      : `你是一位世界顶级的MBTI性格分析专家，拥有心理学博士学位和20年临床经验。

请严格按照以下要求提供深度专业的MBTI性格类型解读：

1. 使用标准中文标点符号：
   - 句子结尾使用句号（。）
   - 列举时使用顿号（、）分隔
   - 并列关系使用逗号（，）
   - 引用或强调使用双引号（""）
   - 冒号（：）用于解释说明
   - 分号（；）用于复杂句子的分隔
   - 破折号（——）用于解释或补充说明

2. 内容要求：
   - 每个方面600-800字
   - 语言严谨专业，逻辑层次分明
   - 融合最新心理学研究成果、认知科学理论和大量实际案例
   - 内容具有极高的专业水准和实用价值

3. 格式要求：
   - 直接用纯文本表达
   - 段落之间用换行分隔
   - 不使用Markdown格式、特殊符号、星号、井号等标记`;
    
    const userPrompt = quickMode
      ? `我的MBTI类型是${mbtiType}。请从以下三个角度提供世界级专业解读，每个方面300-400字，要求内容深度专业、实用性强，标点符号规范：

1. 职业发展深度解析
探索您的职业优势与发展路径，包括认知优势分析、最适合的职业领域、工作风格特点、职场成功策略、领导力发展路径、职业瓶颈突破方法。

2. 人际关系深度剖析
分析您的社交心理特征，包括沟通模式分析、友谊建立与维护、亲密关系特点、冲突处理策略、人际影响力提升方法。

3. 个人成长全面指南
制定您的成长发展计划，包括认知发展特点、学习风格优化、情绪管理策略、压力应对机制、潜能开发方向、长期发展规划。

请确保内容具有心理学理论支撑，包含具体可操作的建议，使用规范的中文标点符号。`
      : `我的MBTI类型是${mbtiType}。请从以下三个角度提供世界级专业解读，每个方面600-800字，要求达到顶级心理咨询师的专业水准，标点符号规范：

1. 职业发展深度解析
深入分析您的职业发展潜力，包括认知功能优势的职场应用分析、最适合的职业领域和具体岗位推荐、工作风格特点和团队协作模式、职场成功的核心策略和关键能力、领导力发展路径和管理风格、职业瓶颈的识别与突破方法、长期职业规划和转型策略。

2. 人际关系深度剖析
全面解析您的人际交往模式，包括社交心理特征和行为模式分析、沟通风格优势和潜在盲区、友谊建立、维护和深化的策略、亲密关系中的表现特点和需求、冲突处理和问题解决能力、人际影响力的建立和提升、社交网络的构建和维护。

3. 个人成长全面指南
制定您的全方位成长计划，包括认知发展特点和思维模式优化、个性化学习风格和知识获取策略、情绪管理和心理健康维护、压力应对机制和韧性培养、潜能开发的具体方向和方法、人格完善和自我实现路径、长期发展规划和目标设定策略。

请确保内容基于最新心理学研究，包含丰富的实际案例和具体可操作的建议，达到世界顶级心理咨询的专业水准，使用规范的中文标点符号。`;

    console.log('开始API调用...');

    const response = await fetchWithRetry(
      `${DEEPSEEK_CONFIG.baseUrl}/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`,
        },
        body: JSON.stringify({
          model: DEEPSEEK_CONFIG.model,
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: userPrompt
            }
          ],
          stream: false,
          max_tokens: quickMode ? 2000 : 4000,
          temperature: quickMode ? 0.6 : 0.7,
          top_p: 0.9,
          response_format: {
            type: "text"
          },
        }),
      },
      2 // 最多重试2次
    );

    console.log('API响应状态:', response.status);

    const data = await response.json() as DeepseekResponse;
    
    if (!data.choices || data.choices.length === 0 || !data.choices[0].message.content) {
      throw new Error('API 返回的数据格式不正确或内容为空');
    }
    
    console.log('API调用成功，解析响应内容...');
    console.log('原始响应长度:', data.choices[0].message.content.length);
    
    // 解析响应内容，提取解读内容
    let content = data.choices[0].message.content;
    
    // 标点符号规范化处理
    content = normalizePunctuation(content);
    
    console.log('规范化后内容长度:', content.length);
    console.log('内容预览:', content.substring(0, 200) + '...');
    
    // 改进的内容解析逻辑
    let sections: string[] = [];
    
    // 方法1：按照数字编号分割（1. 2. 3.）
    const numberedSections = content.match(/\d+[.、]\s*[^]*?(?=\d+[.、]|$)/g);
    if (numberedSections && numberedSections.length >= 3) {
      console.log('使用数字编号分割，找到', numberedSections.length, '个部分');
      sections = numberedSections.slice(0, 3).map((section, index) => {
        // 移除开头的数字编号
        const cleaned = section.replace(/^\d+[.、]\s*/, '').trim();
        const processed = cleanMarkdownSyntax(cleaned);
        console.log(`编号部分${index + 1}长度:`, processed.length);
        console.log(`编号部分${index + 1}预览:`, processed.substring(0, 100) + '...');
        return processed;
      });
    }
    
    // 方法2：如果没有找到编号，按关键词分割
    if (sections.length < 3) {
      console.log('数字编号分割失败，尝试关键词分割');
      const keywords = ['职业发展深度解析', '人际关系深度剖析', '个人成长全面指南'];
      
      for (const keyword of keywords) {
        // 更精确的关键词匹配
        const regex = new RegExp(`${keyword}[：:]?[^]*?(?=${keywords.filter(k => k !== keyword).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}|$)`, 'i');
        const match = content.match(regex);
        if (match) {
          // 移除关键词标题
          const cleaned = match[0].replace(new RegExp(`^${keyword}[：:]?\\s*`, 'i'), '').trim();
          const processed = cleanMarkdownSyntax(cleaned);
          console.log(`关键词 "${keyword}" 匹配长度:`, processed.length);
          console.log(`关键词 "${keyword}" 预览:`, processed.substring(0, 100) + '...');
          sections.push(processed);
        }
      }
    }
    
    // 方法3：如果还是不够，按双换行分割
    if (sections.length < 3) {
      console.log('关键词分割失败，尝试双换行分割');
    const paragraphs = content
        .split(/\n\s*\n/)
        .filter(p => p.trim().length > 100) // 提高最小长度要求
      .slice(0, 3)
        .map((p, index) => {
          const processed = cleanMarkdownSyntax(p.trim());
          console.log(`段落${index + 1}长度:`, processed.length);
          console.log(`段落${index + 1}预览:`, processed.substring(0, 100) + '...');
          return processed;
        });
      
      if (paragraphs.length >= 3) {
        console.log('双换行分割成功，找到', paragraphs.length, '个段落');
        sections = paragraphs;
      }
    }
    
    // 方法4：如果解析失败，返回整个内容分成三部分
    if (sections.length < 3) {
      console.log('所有分割方法失败，强制分割为三部分');
      const contentLength = content.length;
      const partLength = Math.floor(contentLength / 3);
      sections = [
        content.substring(0, partLength),
        content.substring(partLength, partLength * 2),
        content.substring(partLength * 2)
      ].map((part, index) => {
        const processed = cleanMarkdownSyntax(part.trim());
        console.log(`强制分割部分${index + 1}长度:`, processed.length);
        console.log(`强制分割部分${index + 1}预览:`, processed.substring(0, 100) + '...');
        return processed;
      });
    }
    
    // 验证内容质量
    const minLength = 200; // 提高最小长度要求
    const validSections = sections.filter(s => s.length >= minLength);
    
    if (validSections.length < 3 && content.length > 600) {
      console.log('部分内容太短，重新按长度分割');
      const contentLength = content.length;
      const partLength = Math.floor(contentLength / 3);
      sections = [
        content.substring(0, partLength),
        content.substring(partLength, partLength * 2),
        content.substring(partLength * 2)
      ].map((part, index) => {
        const processed = cleanMarkdownSyntax(part.trim());
        console.log(`重新分割部分${index + 1}长度:`, processed.length);
        return processed;
      });
    } else if (validSections.length >= 3) {
      sections = validSections.slice(0, 3);
    }
    
    console.log('最终解析后的段落数量:', sections.length);
    console.log('各段落长度:', sections.map(s => s.length));
    console.log('段落完整性检查:', sections.map((s, i) => ({
      index: i + 1,
      length: s.length,
      startsWithTitle: /^(职业发展|人际关系|个人成长)/.test(s),
      endsComplete: /[。！？]$/.test(s.trim())
    })));
    
    if (sections.length === 0 || sections.every(s => s.length < 100)) {
      throw new Error('解析后的内容为空或过短，请重试');
    }
    
    return sections.slice(0, 3);
  } catch (error) {
    console.error('Error generating MBTI interpretation with Deepseek:', error);
    console.log('API调用失败的详细信息:', {
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
      mbtiType: mbtiType,
      quickMode: quickMode
    });
    
    // 重新抛出错误，不使用模拟数据
    throw new Error(`MBTI解读生成失败: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// 新增：标点符号规范化函数
function normalizePunctuation(text: string): string {
  return text
    // 规范化基本标点符号
    .replace(/[.．]/g, '。')
    .replace(/[,，]/g, '，')
    .replace(/[:：]/g, '：')
    .replace(/[;；]/g, '；')
    .replace(/[?？]/g, '？')
    .replace(/[!！]/g, '！')
    .replace(/[-—–−]/g, '——')
    .replace(/——+/g, '——')
    .replace(/…/g, '……')
    .replace(/\.\.\./g, '……')
    .replace(/\(/g, '（')
    .replace(/\)/g, '）')
    // 移除多余空格
    .replace(/\s+/g, ' ')
    .replace(/\s+([。，、：；？！）])/g, '$1')
    .replace(/([（])\s+/g, '$1')
    .replace(/([。！？])([^。！？\s])/g, '$1 $2')
    .trim();
}